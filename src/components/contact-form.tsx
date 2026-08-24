"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type Status = { kind: "idle" } | { kind: "sent" } | { kind: "error"; message: string };

export const ContactForm = () => {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus({ kind: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setStatus({
          kind: "error",
          message: payload?.error ?? "Something went wrong. Please email me directly.",
        });
        return;
      }

      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: "Could not reach the server. Please email me directly.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What would you like to talk about?"
                  className="min-h-36"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot: hidden from people, tempting to bots. */}
        <div aria-hidden className="hidden">
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...form.register("website")} />
        </div>

        <div className="flex flex-wrap items-center gap-5 pt-2">
          <Button type="submit" variant="chunky" size="xl" disabled={form.formState.isSubmitting}>
            <Send className="h-4 w-4" />
            {form.formState.isSubmitting ? "Sending..." : "Send it"}
          </Button>

          <p aria-live="polite" className="font-mono text-[13px]">
            {status.kind === "idle" && (
              <span className="text-muted-foreground">
                {"// I reply faster than a season gap."}
              </span>
            )}
            {status.kind === "sent" && (
              <span className="font-bold text-accent">
                {"// sent. you’ll hear back before the next season."}
              </span>
            )}
            {status.kind === "error" && <span className="text-destructive">{status.message}</span>}
          </p>
        </div>
      </form>
    </Form>
  );
};
