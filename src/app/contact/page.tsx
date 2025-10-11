"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-6"
      >
        <h1 className="text-4xl font-bold text-center">Let’s Connect</h1>
        <p className="text-muted-foreground text-center">
          Have a project in mind or just want to say hi? Drop me a message below.
        </p>
        <ContactForm />
      </motion.div>
    </main>
  );
}
