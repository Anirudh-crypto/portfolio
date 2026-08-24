"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { getFirebaseAuth, getDb, googleProvider } from "@/firebase/config";
import {
  ADMIN_EMAIL,
  isFirebaseConfigured,
  missingFirebaseEnvVars,
} from "@/firebase/constants";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  ProjectForm,
  emptyProjectForm,
  type ProjectFormValues,
} from "@/components/admin/project-form";
import { useFirestoreProjects } from "@/hooks/use-firestore-projects";
import type { Project } from "@/lib/projects";
import { seedProjects } from "@/lib/seed-projects";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const parseCommaSeparatedValues = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const parseLineSeparatedValues = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

/** Omits blank optional fields entirely rather than writing empty strings. */
const optional = (key: string, value: string) =>
  value.trim() ? { [key]: value.trim() } : {};

const createProjectPayload = (values: ProjectFormValues) => {
  const order = Number(values.order.trim());

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    details: parseLineSeparatedValues(values.details),
    tech: parseCommaSeparatedValues(values.tech),
    metrics: parseLineSeparatedValues(values.metrics),
    ...optional("link", values.link),
    ...optional("repoUrl", values.repoUrl),
    ...optional("imageUrl", values.imageUrl),
    ...optional("episodeTitle", values.episodeTitle),
    ...optional("guestStarring", values.guestStarring),
    ...optional("runtime", values.runtime),
    ...optional("coldOpen", values.coldOpen),
    ...optional("plot", values.plot),
    ...optional("twist", values.twist),
    ...optional("finale", values.finale),
    ...(values.order.trim() && Number.isFinite(order) ? { order } : {}),
  };
};

const createProjectFormValues = (project: Project): ProjectFormValues => ({
  title: project.title,
  description: project.description,
  details: project.details.join("\n"),
  tech: project.tech.join(", "),
  link: project.link ?? "",
  repoUrl: project.repoUrl ?? "",
  imageUrl: project.imageUrl ?? "",
  // MAX_SAFE_INTEGER is the "unordered" sentinel from normalizeProject.
  order: project.order === Number.MAX_SAFE_INTEGER ? "" : String(project.order),
  episodeTitle: project.episodeTitle ?? "",
  guestStarring: project.guestStarring ?? "",
  runtime: project.runtime ?? "",
  coldOpen: project.coldOpen ?? "",
  plot: project.plot ?? "",
  twist: project.twist ?? "",
  finale: project.finale ?? "",
  metrics: project.metrics.map((metric) => `${metric.label}: ${metric.value}`).join("\n"),
});

/** Centred wrapper for the gate screens (unconfigured, signed out, not owner). */
const Shell = ({ children }: { children: ReactNode }) => (
  <Container className="flex min-h-[70vh] flex-col justify-center py-12">{children}</Container>
);

/**
 * The seed fields that "Backfill episode copy" can fill in.
 *
 * Backfill only ever writes a field that is currently empty, so re-running it
 * after editing is a no-op on anything already written.
 */
const BACKFILL_KEYS = [
  "episodeTitle",
  "guestStarring",
  "runtime",
  "coldOpen",
  "plot",
  "twist",
  "finale",
] as const;

const describeError = (error: unknown, fallback: string) => {
  if (error && typeof error === "object" && "code" in error) {
    const code = String((error as { code: unknown }).code);

    if (code === "permission-denied") {
      return "Firestore rejected the write. Check that you are signed in as the owner.";
    }

    if (code === "unavailable") {
      return "Could not reach Firestore. Check your connection and try again.";
    }
  }

  return error instanceof Error ? error.message : fallback;
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const isOwner = Boolean(user?.email && user.email === ADMIN_EMAIL);

  const { projects, isLoading, error } = useFirestoreProjects({ enabled: isOwner });
  const [newProject, setNewProject] = useState<ProjectFormValues>(emptyProjectForm);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectFormValues>(emptyProjectForm);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isBackfilling, setIsBackfilling] = useState(false);

  /**
   * Live projects paired with the seed entry of the same title, keeping only
   * those where the seed has copy the document is missing.
   */
  const backfillCandidates = useMemo(() => {
    const seedByTitle = new Map(
      seedProjects.map((seed) => [seed.title.trim().toLowerCase(), seed])
    );

    return projects.flatMap((project) => {
      const seed = seedByTitle.get(project.title.trim().toLowerCase());

      if (!seed) return [];

      const patch: Record<string, string | string[]> = {};

      for (const key of BACKFILL_KEYS) {
        const seedValue = seed[key];

        // Only fill a field the document is actually missing.
        if (seedValue && !project[key]) {
          patch[key] = seedValue;
        }
      }

      // Metrics is a list, so "empty" means zero entries rather than a blank string.
      if (project.metrics.length === 0 && seed.metrics?.length) {
        patch.metrics = seed.metrics;
      }

      return Object.keys(patch).length > 0 ? [{ id: project.id, patch }] : [];
    });
  }, [projects]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (currentUser) => {
      setUser(currentUser);
      setIsAuthResolved(true);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Public pages are cached, so a write is only half the job — the cache has to
   * be cleared too. A failure here is non-fatal: the change is already saved
   * and the cache expires on its own within the hour.
   */
  const revalidatePublicPages = useCallback(async () => {
    const currentUser = getFirebaseAuth().currentUser;

    if (!currentUser) return;

    try {
      const idToken = await currentUser.getIdToken();
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      });
    } catch (revalidateError) {
      console.error("Could not revalidate public pages.", revalidateError);
    }
  }, []);

  const handleLogin = async () => {
    setAuthError(null);

    try {
      await signInWithPopup(getFirebaseAuth(), googleProvider);
    } catch (loginError) {
      const code =
        loginError && typeof loginError === "object" && "code" in loginError
          ? String((loginError as { code: unknown }).code)
          : "";

      // Closing the popup is a deliberate cancellation, not an error worth showing.
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        return;
      }

      setAuthError(describeError(loginError, "Sign-in failed. Please try again."));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getFirebaseAuth());
    } catch (logoutError) {
      setAuthError(describeError(logoutError, "Sign-out failed."));
    }
  };

  const handleAddProject = async () => {
    if (!newProject.title.trim()) return;

    setIsCreatingProject(true);
    setActionError(null);

    try {
      await addDoc(collection(getDb(), "projects"), {
        ...createProjectPayload(newProject),
        createdAt: new Date(),
      });

      setNewProject(emptyProjectForm);
      await revalidatePublicPages();
    } catch (createError) {
      setActionError(describeError(createError, "Could not add the project."));
    } finally {
      setIsCreatingProject(false);
    }
  };

  /**
   * One-time import of the entries that used to be hard-coded in the source.
   * Only offered while the collection is empty, so it cannot create duplicates.
   */
  const handleSeedProjects = async () => {
    setIsSeeding(true);
    setActionError(null);

    try {
      const createdAt = new Date();

      for (const project of seedProjects) {
        await addDoc(collection(getDb(), "projects"), { ...project, createdAt });
      }

      await revalidatePublicPages();
    } catch (seedError) {
      setActionError(describeError(seedError, "Could not import the starter projects."));
    } finally {
      setIsSeeding(false);
    }
  };

  /**
   * Fills in episode copy the seed file has and a document lacks.
   *
   * Only ever writes fields that are currently empty, so running it after
   * hand-editing cannot clobber the edit.
   */
  const handleBackfill = async () => {
    setIsBackfilling(true);
    setActionError(null);

    try {
      for (const { id, patch } of backfillCandidates) {
        await updateDoc(doc(getDb(), "projects", id), { ...patch, updatedAt: new Date() });
      }

      await revalidatePublicPages();
    } catch (backfillError) {
      setActionError(describeError(backfillError, "Could not backfill the episode copy."));
    } finally {
      setIsBackfilling(false);
    }
  };

  const handleCancelEditing = () => {
    setEditingProjectId(null);
    setEditingProject(emptyProjectForm);
  };

  const handleStartEditing = (project: Project) => {
    setEditingProjectId(project.id);
    setEditingProject(createProjectFormValues(project));
  };

  const handleUpdateProject = async () => {
    if (!editingProjectId || !editingProject.title.trim()) return;

    setIsUpdatingProject(true);
    setActionError(null);

    try {
      await updateDoc(doc(getDb(), "projects", editingProjectId), {
        ...createProjectPayload(editingProject),
        updatedAt: new Date(),
      });

      handleCancelEditing();
      await revalidatePublicPages();
    } catch (updateError) {
      setActionError(describeError(updateError, "Could not save your changes."));
    } finally {
      setIsUpdatingProject(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;

    setIsDeleting(true);
    setActionError(null);

    try {
      await deleteDoc(doc(getDb(), "projects", pendingDelete.id));

      if (editingProjectId === pendingDelete.id) {
        handleCancelEditing();
      }

      setPendingDelete(null);
      await revalidatePublicPages();
    } catch (deleteError) {
      setActionError(describeError(deleteError, "Could not delete the project."));
    } finally {
      setIsDeleting(false);
    }
  };

  /*
    Firebase is not configured at all. `getFirebaseAuth()` would throw
    `auth/invalid-api-key` inside the effect below and land in the generic
    error boundary, which tells you nothing about the actual cause.
  */
  if (!isFirebaseConfigured) {
    return (
      <Shell>
        <div className="hard mx-auto w-full max-w-lg bg-card p-8">
          <h1 className="font-display text-3xl">Firebase isn&rsquo;t configured</h1>
          <p className="mt-4 text-muted-foreground">
            The admin panel needs the Firebase web config to sign you in. Copy{" "}
            <code className="font-mono text-sm">.env.example</code> to{" "}
            <code className="font-mono text-sm">.env.local</code>, fill in the values from the
            Firebase console, then restart the dev server.
          </p>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Missing
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {missingFirebaseEnvVars.map((name) => (
              <li key={name} className="font-mono text-[13px] text-destructive">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    );
  }

  if (!isAuthResolved) {
    return (
      <Shell>
        <p className="text-center font-mono text-sm text-muted-foreground">
          Checking your session&hellip;
        </p>
      </Shell>
    );
  }

  if (!user) {
    return (
      <Shell>
        <div className="hard mx-auto w-full max-w-md bg-card p-8 text-center">
          <h1 className="font-display text-3xl">Admin Access</h1>
          <p className="mb-7 mt-4 text-sm text-muted-foreground">
            Sign in with your Google account to manage projects.
          </p>
          <Button onClick={handleLogin} variant="chunky" size="xl">
            Login with Google
          </Button>
          {authError && <p className="mt-5 text-sm text-destructive">{authError}</p>}
        </div>
      </Shell>
    );
  }

  // Signed in, but not as the owner. Firestore rules reject the writes anyway;
  // this just replaces a panel full of failing buttons with a clear message.
  if (!isOwner) {
    return (
      <Shell>
        <div className="hard mx-auto w-full max-w-md bg-card p-8 text-center">
          <h1 className="font-display text-3xl">Not authorized</h1>
          <p className="mb-7 mt-4 text-sm text-muted-foreground">
            {user.email} does not have access to this panel.
          </p>
          <Button variant="outline" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </Shell>
    );
  }

  return (
    <Container className="flex flex-col gap-7 py-10">
      <section className="hard bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">Admin Panel</h1>
            <p className="mt-2 font-mono text-xs tracking-[0.08em] text-muted-foreground">
              Signed in as {user.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>

      {actionError && (
        <p
          role="alert"
          className="border-[3px] border-destructive bg-destructive/10 p-4 text-sm font-bold text-destructive"
        >
          {actionError}
        </p>
      )}

      <section className="hard space-y-4 bg-card p-6 sm:p-8">
        <h2 className="font-display text-2xl">Add Project</h2>
        <ProjectForm
          formId="create-project"
          values={newProject}
          onChange={setNewProject}
          onSubmit={handleAddProject}
          submitLabel="Add Project"
          isSubmitting={isCreatingProject}
        />
      </section>

      <section className="hard bg-card p-6 sm:p-8">
        <h2 className="mb-5 font-display text-2xl">Existing Projects</h2>
        <div className="space-y-4">
          {isLoading && (
            <p className="font-mono text-sm text-muted-foreground">
              Syncing projects from Firestore&hellip;
            </p>
          )}
          {error && (
            <p className="text-sm font-bold text-destructive">
              Unable to read projects from Firestore.
            </p>
          )}
          {!isLoading && !error && projects.length === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                No projects yet. Add your first one above, or import the three original portfolio
                entries to start from.
              </p>
              <Button variant="outline" onClick={handleSeedProjects} disabled={isSeeding}>
                {isSeeding ? "Importing..." : "Seed starter projects"}
              </Button>
            </div>
          )}

          {/*
            Backfill exists because the seed action only appears on an empty
            collection: without it, episode copy added to the seed file after
            the first seed could never reach existing documents.
          */}
          {backfillCandidates.length > 0 && (
            <div className="border-[3px] border-foreground bg-mustard p-4 text-navy">
              <p className="text-sm font-bold">
                {backfillCandidates.length} project
                {backfillCandidates.length === 1 ? " is" : "s are"} missing episode copy.
              </p>
              <p className="mt-1.5 text-sm">
                Backfilling fills only fields that are currently empty — anything you have already
                written is left alone.
              </p>
              <Button
                variant="chunkyCream"
                onClick={handleBackfill}
                disabled={isBackfilling}
                className="mt-4 h-11 px-5 text-sm"
              >
                {isBackfilling ? "Backfilling..." : "Backfill episode copy"}
              </Button>
            </div>
          )}

          {projects.map((project) => (
            <article
              key={project.id}
              className="space-y-4 border-[3px] border-foreground bg-background p-5"
            >
              {editingProjectId === project.id ? (
                <ProjectForm
                  formId={`edit-project-${project.id}`}
                  values={editingProject}
                  onChange={setEditingProject}
                  onSubmit={handleUpdateProject}
                  submitLabel="Save Changes"
                  isSubmitting={isUpdatingProject}
                  onCancel={handleCancelEditing}
                />
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-lg">{project.title}</h3>
                      {project.episodeTitle && (
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                          {project.episodeTitle}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleStartEditing(project)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPendingDelete(project)}
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {project.details.length > 0 && (
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {project.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}

                  {project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="border-2 border-foreground bg-card px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.07em]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <Dialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setPendingDelete(null);
        }}
      >
        <DialogContent className="max-w-md rounded-none border-[3px] border-foreground bg-card">
          <DialogHeader className="text-left">
            <DialogTitle className="font-display text-2xl">Delete this project?</DialogTitle>
            <DialogDescription>
              &ldquo;{pendingDelete?.title}&rdquo; will be permanently removed from Firestore. This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPendingDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
