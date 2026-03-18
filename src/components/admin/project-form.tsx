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
};

type ProjectFormTab = "overview" | "details";

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

  const titleId = `${formId}-project-title`;
  const descriptionId = `${formId}-project-description`;
  const techId = `${formId}-project-tech`;
  const linkId = `${formId}-project-link`;
  const detailsId = `${formId}-project-details`;

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

      {activeTab === "overview" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={titleId}>Title</Label>
            <Input
              id={titleId}
              placeholder="Project title"
              value={values.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={descriptionId}>Small Description</Label>
            <Textarea
              id={descriptionId}
              placeholder="A short paragraph for the project card."
              value={values.description}
              onChange={(event) => updateField("description", event.target.value)}
              className="min-h-28 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={techId}>Technologies</Label>
            <Input
              id={techId}
              placeholder="React, Next.js, Firebase"
              value={values.tech}
              onChange={(event) => updateField("tech", event.target.value)}
              className="rounded-xl"
            />
            <p className="text-xs text-muted-foreground">Separate each technology with a comma.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={linkId}>Project Link</Label>
            <Input
              id={linkId}
              placeholder="https://example.com"
              value={values.link}
              onChange={(event) => updateField("link", event.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor={detailsId}>Description Bullet Points</Label>
          <Textarea
            id={detailsId}
            placeholder={"Built the core feature\nOptimized query performance\nDeployed the app to production"}
            value={values.details}
            onChange={(event) => updateField("details", event.target.value)}
            className="min-h-40 rounded-xl"
          />
          <p className="text-xs text-muted-foreground">Add one bullet point per line.</p>
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
