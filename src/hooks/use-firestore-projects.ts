"use client";

import { useEffect, useState } from "react";
import type { FirestoreError } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import type { Project } from "@/lib/projects";

type FirestoreProjectDocument = Omit<Project, "id"> & {
  createdAt?: unknown;
};

const toTrimmedString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const toStringArray = (value: unknown) =>
  Array.isArray(value)
    ? value
        .map((item) => toTrimmedString(item))
        .filter((item) => item.length > 0)
    : [];

const getCreatedAtTime = (value: unknown) => {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsedValue = Date.parse(value);
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toMillis" in value &&
    typeof value.toMillis === "function"
  ) {
    return value.toMillis();
  }

  return 0;
};

const normalizeProject = (id: string, data: Omit<FirestoreProjectDocument, "createdAt">): Project | null => {
  const title = toTrimmedString(data.title);

  if (!title) {
    return null;
  }

  return {
    id,
    title,
    description: toTrimmedString(data.description),
    details: toStringArray(data.details),
    tech: toStringArray(data.tech),
    link: toTrimmedString(data.link) || undefined,
  };
};

type UseFirestoreProjectsOptions = {
  enabled?: boolean;
};

export const useFirestoreProjects = ({ enabled = true }: UseFirestoreProjectsOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!enabled) {
      setProjects([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const nextProjects = snapshot.docs
          .map((item) => ({ id: item.id, ...(item.data() as FirestoreProjectDocument) }))
          .sort((left, right) => getCreatedAtTime(right.createdAt) - getCreatedAtTime(left.createdAt))
          .map(({ id, ...project }) => normalizeProject(id, project))
          .filter((project): project is Project => project !== null);

        setProjects(nextProjects);
        setError(null);
        setIsLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [enabled]);

  return { projects, isLoading, error };
};
