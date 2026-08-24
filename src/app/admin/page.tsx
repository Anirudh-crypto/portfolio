"use client";

import { useCallback, useEffect, useState } from "react";
import { getFirebaseAuth, getDb, googleProvider } from "@/firebase/config";
import { ADMIN_EMAIL } from "@/firebase/constants";
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

const createProjectPayload = (values: ProjectFormValues) => {
  const order = Number(values.order.trim());

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    details: parseLineSeparatedValues(values.details),
    tech: parseCommaSeparatedValues(values.tech),
    ...(values.link.trim() ? { link: values.link.trim() } : {}),
    ...(values.repoUrl.trim() ? { repoUrl: values.repoUrl.trim() } : {}),
    ...(values.imageUrl.trim() ? { imageUrl: values.imageUrl.trim() } : {}),
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
});

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

  if (!isAuthResolved) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking your session...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="surface-card w-full max-w-md p-8 text-center">
          <h1 className="mb-4 text-3xl font-semibold">Admin Access</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign in with your Google account to manage projects.
          </p>
          <Button onClick={handleLogin} className="rounded-full px-6">
            Login with Google
          </Button>
          {authError && <p className="mt-4 text-sm text-destructive">{authError}</p>}
        </div>
      </div>
    );
  }

  // Signed in, but not as the owner. Firestore rules reject the writes anyway;
  // this just replaces a panel full of failing buttons with a clear message.
  if (!isOwner) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="surface-card w-full max-w-md p-8 text-center">
          <h1 className="mb-4 text-3xl font-semibold">Not authorized</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            {user.email} does not have access to this panel.
          </p>
          <Button variant="outline" onClick={handleLogout} className="rounded-full px-6">
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <section className="surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted-foreground">Signed in as {user.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="rounded-full">
            Logout
          </Button>
        </div>
      </section>

      {actionError && (
        <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {actionError}
        </p>
      )}

      <section className="surface-card space-y-3 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Add Project</h2>
        <ProjectForm
          formId="create-project"
          values={newProject}
          onChange={setNewProject}
          onSubmit={handleAddProject}
          submitLabel="Add Project"
          isSubmitting={isCreatingProject}
        />
      </section>

      <section className="surface-card p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold">Existing Projects</h2>
        <div className="space-y-3">
          {isLoading && <p className="text-sm text-muted-foreground">Syncing projects from Firestore...</p>}
          {error && (
            <p className="text-sm text-destructive">Unable to read projects from Firestore.</p>
          )}
          {!isLoading && !error && projects.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                No projects yet. Add your first one above, or import the three original portfolio
                entries to start from.
              </p>
              <Button
                variant="outline"
                onClick={handleSeedProjects}
                disabled={isSeeding}
                className="rounded-full"
              >
                {isSeeding ? "Importing..." : "Seed starter projects"}
              </Button>
            </div>
          )}

          {projects.map((project) => (
            <article
              key={project.id}
              className="space-y-4 rounded-xl border border-border bg-background/65 p-4"
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
                    <div className="space-y-1">
                      <h3 className="font-semibold">{project.title}</h3>
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
                          className="rounded-full border border-border/80 bg-background/75 px-3 py-1 text-xs text-muted-foreground"
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
        <DialogContent className="max-w-md rounded-2xl border-border bg-card">
          <DialogHeader className="text-left">
            <DialogTitle>Delete this project?</DialogTitle>
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
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="rounded-full"
            >
              {isDeleting ? "Deleting..." : "Delete project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
