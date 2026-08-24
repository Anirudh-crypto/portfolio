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
  episodeTitle: string;
  guestStarring: string;
  runtime: string;
  coldOpen: string;
  plot: string;
  twist: string;
  finale: string;
  metrics: string;
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
  episodeTitle: "",
  guestStarring: "",
  runtime: "",
  coldOpen: "",
  plot: "",
  twist: "",
  finale: "",
  metrics: "",
};

type ProjectFormTab = "overview" | "episode" | "story" | "details" | "links";

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
  { id: "episode", label: "Episode" },
  { id: "story", label: "Case Study" },
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
             
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("description")}>Small Description</Label>
            <Textarea
              id={fieldId("description")}
              placeholder="A short paragraph for the project card."
              value={values.description}
              onChange={(event) => updateField("description", event.target.value)}
              className="min-h-28"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("tech")}>Technologies</Label>
            <Input
              id={fieldId("tech")}
              placeholder="React, Next.js, Firebase"
              value={values.tech}
              onChange={(event) => updateField("tech", event.target.value)}
             
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
             
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first. Leave blank to sort by newest.
            </p>
          </div>
        </div>
      )}

      {activeTab === "episode" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={fieldId("episodeTitle")}>Episode Title</Label>
            <Input
              id={fieldId("episodeTitle")}
              placeholder="The One Where Reddit Wouldn't Shut Up"
              value={values.episodeTitle}
              onChange={(event) => updateField("episodeTitle", event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              The headline shown on cards and the case-study page. Leave blank to use the real
              project title instead.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("guestStarring")}>Guest Starring</Label>
            <Input
              id={fieldId("guestStarring")}
              placeholder="Apache Kafka"
              value={values.guestStarring}
              onChange={(event) => updateField("guestStarring", event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              The one technology most associated with this project.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("runtime")}>Runtime</Label>
            <Input
              id={fieldId("runtime")}
              placeholder="4 months"
              value={values.runtime}
              onChange={(event) => updateField("runtime", event.target.value)}
            />
          </div>
        </div>
      )}

      {activeTab === "story" && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            The four beats of the case-study page. Any you leave blank are simply not rendered; if
            you write none, the bullet points are shown instead.
          </p>

          <div className="space-y-2">
            <Label htmlFor={fieldId("coldOpen")}>Cold Open — the problem</Label>
            <Textarea
              id={fieldId("coldOpen")}
              placeholder="What made this hard, and why the obvious approach did not work."
              value={values.coldOpen}
              onChange={(event) => updateField("coldOpen", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("plot")}>The Plot — the approach</Label>
            <Textarea
              id={fieldId("plot")}
              placeholder="What you built and how the pieces fit together."
              value={values.plot}
              onChange={(event) => updateField("plot", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("twist")}>The Twist — what actually broke</Label>
            <Textarea
              id={fieldId("twist")}
              placeholder="The failure you did not expect, and the change that fixed it."
              value={values.twist}
              onChange={(event) => updateField("twist", event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Reviewers read this beat most carefully — it shows judgement rather than tool choice.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("finale")}>Series Finale — where it landed</Label>
            <Textarea
              id={fieldId("finale")}
              placeholder="The outcome, ideally with a number you measured."
              value={values.finale}
              onChange={(event) => updateField("finale", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("metrics")}>Metrics Strip</Label>
            <Textarea
              id={fieldId("metrics")}
              placeholder={"Ingest: Reddit live stream\nThroughput: 12k events/sec\nDeployed on: GCP · Docker"}
              value={values.metrics}
              onChange={(event) => updateField("metrics", event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              One <code>Label: Value</code> pair per line. The first four are shown.
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
            className="min-h-40"
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
             
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldId("imageUrl")}>Preview Image</Label>
            <Input
              id={fieldId("imageUrl")}
              placeholder="/images/project.jpg or https://..."
              value={values.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
             
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
