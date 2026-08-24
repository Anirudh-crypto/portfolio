"use client";

import { useEffect, useState } from "react";
import type { FirestoreError } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { getDb } from "@/firebase/config";
import { normalizeProject, sortProjects, type Project, type RawProject } from "@/lib/projects";

type UseFirestoreProjectsOptions = {
  enabled?: boolean;
};

/**
 * Live project list for the admin panel.
 *
 * Public pages must NOT use this — they render server-side via
 * `getProjects()` in `lib/projects-server.ts`, so visitors don't each open a
 * billed Firestore listener and crawlers see real content.
 */
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
      collection(getDb(), "projects"),
      (snapshot) => {
        const nextProjects = snapshot.docs
          .map((document) => normalizeProject(document.id, document.data() as RawProject))
          .filter((project): project is Project => project !== null);

        setProjects(sortProjects(nextProjects));
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
