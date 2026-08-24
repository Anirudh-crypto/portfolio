"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ProjectFormValues = {
  title: string;
  description: string;
  details: string;
  tech: string;
  link: string;
  repoUrl: string;
  imageUrl: string;
  order: string;
};

export const emptyProjectForm: ProjectFormValues = {
  title: "",
  description: "",
  details: "",
  tech: "",
  link: "",
  repoUrl: "",
  imageUrl: "",
  order: "",
};

type ProjectFormTab = "overview" | "details" | "links";

type ProjectFormProps = {
  formId: string;
  values: ProjectFormValues;
  onChange: (values: ProjectFormValues) => void;
  onSubmit: () => Promise<void> | void;
  submitLabel: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
};

const tabs: { id: ProjectFormTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Bullet Points" },
  { id: "links", label: "Links & Media" },
];

export const ProjectForm = ({
  formId,
  values,
  onChange,
  onSubmit,
  submitLabel,
  isSubmitting = false,
  onCancel,
}: ProjectFormProps) => {
  const [activeTab, setActiveTab] = useState<ProjectFormTab>("overview");

  useEffect(() => {
    setActiveTab("overview");
  }, [formId]);

  const updateField = (field: keyof ProjectFormValues, value: string) => {
    onChange({ ...values, [field]: value });
  };

  const fieldId = (field: string) => `${formId}-project-${field}`;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="rounded-full"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={fieldId("title")}>Title</Label>
            <Input
              id={fieldId("title")}
              placeholder="Project title"
              value={values.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("description")}>Small Description</Label>
            <Textarea
              id={fieldId("description")}
              placeholder="A short paragraph for the project card."
              value={values.description}
              onChange={(event) => updateField("description", event.target.value)}
              className="min-h-28 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("tech")}>Technologies</Label>
            <Input
              id={fieldId("tech")}
              placeholder="React, Next.js, Firebase"
              value={values.tech}
              onChange={(event) => updateField("tech", event.target.value)}
              className="rounded-xl"
            />
            <p className="text-xs text-muted-foreground">Separate each technology with a comma.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("order")}>Display Order</Label>
            <Input
              id={fieldId("order")}
              type="number"
              inputMode="numeric"
              placeholder="1"
              value={values.order}
              onChange={(event) => updateField("order", event.target.value)}
              className="rounded-xl"
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first. Leave blank to sort by newest.
            </p>
          </div>
        </div>
      )}

      {activeTab === "details" && (
        <div className="space-y-2">
          <Label htmlFor={fieldId("details")}>Description Bullet Points</Label>
          <Textarea
            id={fieldId("details")}
            placeholder={"Built the core feature\nOptimized query performance\nDeployed the app to production"}
            value={values.details}
            onChange={(event) => updateField("details", event.target.value)}
            className="min-h-40 rounded-xl"
          />
          <p className="text-xs text-muted-foreground">Add one bullet point per line.</p>
        </div>
      )}

      {activeTab === "links" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={fieldId("link")}>Live Project Link</Label>
            <Input
              id={fieldId("link")}
              type="url"
              placeholder="https://example.com"
              value={values.link}
              onChange={(event) => updateField("link", event.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("repoUrl")}>Source Repository</Label>
            <Input
              id={fieldId("repoUrl")}
              type="url"
              placeholder="https://github.com/username/repository"
              value={values.repoUrl}
              onChange={(event) => updateField("repoUrl", event.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("imageUrl")}>Preview Image</Label>
            <Input
              id={fieldId("imageUrl")}
              placeholder="/images/project.jpg or https://..."
              value={values.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
              className="rounded-xl"
            />
            <p className="text-xs text-muted-foreground">
              Paths beginning with / are served from the public folder and get optimised.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => void onSubmit()}
          className="rounded-full px-6"
          disabled={isSubmitting || !values.title.trim()}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="rounded-full">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};
