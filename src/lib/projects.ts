/** A `Label: Value` pair for the case-study metrics strip. */
export type Metric = { label: string; value: string };

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

  /*
   * Episode framing. All optional — a project with none of these still renders
   * correctly, falling back to `title` and the `details` bullets.
   */
  episodeTitle?: string;
  guestStarring?: string;
  runtime?: string;

  /* Case-study beats. Absent beats are simply not rendered. */
  coldOpen?: string;
  plot?: string;
  twist?: string;
  finale?: string;
  metrics: Metric[];
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

    episodeTitle: toOptionalString(data.episodeTitle),
    guestStarring: toOptionalString(data.guestStarring),
    runtime: toOptionalString(data.runtime),

    coldOpen: toOptionalString(data.coldOpen),
    plot: toOptionalString(data.plot),
    twist: toOptionalString(data.twist),
    finale: toOptionalString(data.finale),
    metrics: toMetrics(data.metrics),
  };
};

/**
 * Metrics are authored as `Label: Value` lines in the admin form and stored as
 * a string array. Lines without a colon are kept as a value with no label
 * rather than being dropped.
 */
const toMetrics = (value: unknown): Metric[] =>
  toStringArray(value)
    .map((line) => {
      const separator = line.indexOf(":");

      if (separator === -1) {
        return { label: "", value: line };
      }

      return {
        label: line.slice(0, separator).trim(),
        value: line.slice(separator + 1).trim(),
      };
    })
    .filter((metric) => metric.value.length > 0);

/** Explicit `order` ascending, then newest first. */
export const sortProjects = (projects: Project[]) =>
  [...projects].sort(
    (left, right) => left.order - right.order || right.createdAtMs - left.createdAtMs
  );

/**
 * Episode code from a project's position in the sorted list. Derived rather
 * than stored, so reordering in the admin panel renumbers automatically.
 */
export const episodeCode = (index: number) =>
  `S01E${String(index + 1).padStart(2, "0")}`;

/** The episode name when one is set, otherwise the project's real title. */
export const headlineOf = (project: Project) => project.episodeTitle || project.title;

/** True when the project has enough written for a case-study page. */
export const hasBeats = (project: Project) =>
  Boolean(project.coldOpen || project.plot || project.twist || project.finale);
