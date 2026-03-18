"use client";

import { useEffect, useState } from "react";
import { auth, provider, db } from "@/firebase/config";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ProjectForm, type ProjectFormValues } from "@/components/admin/project-form";
import { useFirestoreProjects } from "@/hooks/use-firestore-projects";
import type { Project } from "@/lib/projects";
import { Button } from "@/components/ui/button";

const emptyProjectForm: ProjectFormValues = {
  title: "",
  description: "",
  details: "",
  tech: "",
  link: "",
};

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

const createProjectPayload = (values: ProjectFormValues) => ({
  title: values.title.trim(),
  description: values.description.trim(),
  details: parseLineSeparatedValues(values.details),
  tech: parseCommaSeparatedValues(values.tech),
  ...(values.link.trim() ? { link: values.link.trim() } : {}),
});

const createProjectFormValues = (project: Project): ProjectFormValues => ({
  title: project.title,
  description: project.description,
  details: project.details.join("\n"),
  tech: project.tech.join(", "),
  link: project.link ?? "",
});

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const { projects, isLoading, error } = useFirestoreProjects({ enabled: Boolean(user) });
  const [newProject, setNewProject] = useState<ProjectFormValues>(emptyProjectForm);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectFormValues>(emptyProjectForm);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleAddProject = async () => {
    if (!newProject.title.trim()) {
      return;
    }

    setIsCreatingProject(true);

    try {
      await addDoc(collection(db, "projects"), {
        ...createProjectPayload(newProject),
        createdAt: new Date(),
      });

      setNewProject(emptyProjectForm);
    } finally {
      setIsCreatingProject(false);
    }
  };

  const handleStartEditing = (project: Project) => {
    setEditingProjectId(project.id);
    setEditingProject(createProjectFormValues(project));
  };

  const handleCancelEditing = () => {
    setEditingProjectId(null);
    setEditingProject(emptyProjectForm);
  };

  const handleUpdateProject = async () => {
    if (!editingProjectId || !editingProject.title.trim()) {
      return;
    }

    setIsUpdatingProject(true);

    try {
      await updateDoc(doc(db, "projects", editingProjectId), {
        ...createProjectPayload(editingProject),
        updatedAt: new Date(),
      });

      handleCancelEditing();
    } finally {
      setIsUpdatingProject(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    setDeletingProjectId(id);

    try {
      await deleteDoc(doc(db, "projects", id));

      if (editingProjectId === id) {
        handleCancelEditing();
      }
    } finally {
      setDeletingProjectId(null);
    }
  };

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="surface-card w-full max-w-md p-8 text-center">
          <h1 className="mb-4 text-3xl font-semibold">Admin Access</h1>
          <p className="mb-6 text-sm text-muted-foreground">Sign in with your Google account to manage projects.</p>
          <Button onClick={handleLogin} className="rounded-full px-6">
            Login with Google
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6 pb-10">
      <section className="surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">Admin Panel</h1>
          <Button variant="outline" onClick={handleLogout} className="rounded-full">
            Logout
          </Button>
        </div>
      </section>

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
          {error && <p className="text-sm text-destructive">Unable to read projects from Firestore.</p>}
          {projects.map((project) => (
            <article
              key={project.id}
              className="space-y-4 rounded-xl border border-border bg-background/65 p-4"
            >
              {editingProjectId === project.id ? (
                <div className="space-y-3">
                  <ProjectForm
                    formId={`edit-project-${project.id}`}
                    values={editingProject}
                    onChange={setEditingProject}
                    onSubmit={handleUpdateProject}
                    submitLabel="Save Changes"
                    isSubmitting={isUpdatingProject}
                    onCancel={handleCancelEditing}
                  />

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                      disabled={deletingProjectId === project.id}
                    >
                      {deletingProjectId === project.id ? "Deleting..." : "Delete Project"}
                    </Button>
                  </div>
                </div>
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
                        onClick={() => handleDeleteProject(project.id)}
                        disabled={deletingProjectId === project.id}
                      >
                        {deletingProjectId === project.id ? "Deleting..." : "Delete"}
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
    </main>
  );
}
