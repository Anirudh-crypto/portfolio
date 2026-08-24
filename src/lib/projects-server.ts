import { FIREBASE_DATABASE_ID, FIREBASE_PROJECT_ID } from "@/firebase/constants";
import { normalizeProject, sortProjects, type Project, type RawProject } from "@/lib/projects";

/**
 * Reads projects over the Firestore REST API instead of the web SDK.
 *
 * Public pages are server-rendered, so project content lands in the initial
 * HTML (crawlable, no layout shift) and anonymous visitors no longer each hold
 * an open `onSnapshot` listener. Requires the public read rule in
 * `firestore.rules`. The admin panel still uses the SDK, where live updates
 * are actually wanted.
 */

const REVALIDATE_SECONDS = 3600;

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  timestampValue?: string;
  nullValue?: null;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields?: Record<string, FirestoreValue> };
};

type FirestoreDocument = {
  name?: string;
  fields?: Record<string, FirestoreValue>;
};

const decodeValue = (value: FirestoreValue): unknown => {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return Number(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.timestampValue !== undefined) return value.timestampValue;
  if (value.arrayValue !== undefined) return (value.arrayValue.values ?? []).map(decodeValue);
  if (value.mapValue !== undefined) return decodeFields(value.mapValue.fields);
  return null;
};

const decodeFields = (fields: Record<string, FirestoreValue> = {}): RawProject =>
  Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]));

/** Firestore document names look like `projects/{id}`; we only want the id. */
const documentId = (name: string | undefined) => name?.split("/").pop() ?? "";

export const getProjects = async (): Promise<Project[]> => {
  if (!FIREBASE_PROJECT_ID) {
    console.warn("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set — rendering an empty project list.");
    return [];
  }

  const endpoint =
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}` +
    `/databases/${FIREBASE_DATABASE_ID}/documents/projects?pageSize=100`;

  try {
    const response = await fetch(endpoint, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["projects"] },
    });

    if (!response.ok) {
      console.error(`Firestore REST read failed: ${response.status} ${response.statusText}`);
      return [];
    }

    const payload = (await response.json()) as { documents?: FirestoreDocument[] };

    const projects = (payload.documents ?? [])
      .map((document) => normalizeProject(documentId(document.name), decodeFields(document.fields)))
      .filter((project): project is Project => project !== null);

    return sortProjects(projects);
  } catch (error) {
    // A portfolio that renders without its project list beats one that 500s.
    console.error("Unable to load projects from Firestore.", error);
    return [];
  }
};

export const getProjectBySlug = async (slug: string) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
};
