export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  details: string[];
  tech: string[];
  link?: string;
  repoUrl?: string;
  imageUrl?: string;
  order: number;
  createdAtMs: number;
};

/**
 * A raw `projects` document, from either the Firestore web SDK (admin panel)
 * or the REST API (server-rendered pages). Every field is `unknown` because
 * documents are written by the admin form and can drift from this shape.
 */
export type RawProject = Record<string, unknown>;

const toTrimmedString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const toOptionalString = (value: unknown) => toTrimmedString(value) || undefined;

const toStringArray = (value: unknown) =>
  Array.isArray(value) ? value.map(toTrimmedString).filter((item) => item.length > 0) : [];

const toNumber = (value: unknown, fallback: number) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
};

/** Accepts a Firestore Timestamp, a Date, an ISO string, or epoch millis. */
export const toMillis = (value: unknown): number => {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toMillis" in value &&
    typeof (value as { toMillis: unknown }).toMillis === "function"
  ) {
    return (value as { toMillis: () => number }).toMillis();
  }

  return 0;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Returns `null` for documents with no usable title, so callers can filter them out. */
export const normalizeProject = (id: string, data: RawProject): Project | null => {
  const title = toTrimmedString(data.title);

  if (!title) {
    return null;
  }

  return {
    id,
    slug: slugify(title) || id,
    title,
    description: toTrimmedString(data.description),
    details: toStringArray(data.details),
    tech: toStringArray(data.tech),
    link: toOptionalString(data.link),
    repoUrl: toOptionalString(data.repoUrl),
    imageUrl: toOptionalString(data.imageUrl),
    // Unordered projects sort after ordered ones rather than jumping to the top.
    order: toNumber(data.order, Number.MAX_SAFE_INTEGER),
    createdAtMs: toMillis(data.createdAt),
  };
};

/** Explicit `order` ascending, then newest first. */
export const sortProjects = (projects: Project[]) =>
  [...projects].sort(
    (left, right) => left.order - right.order || right.createdAtMs - left.createdAtMs
  );
