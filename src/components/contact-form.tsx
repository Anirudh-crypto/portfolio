"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input type="text" placeholder="Your name" required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input type="email" placeholder="you@example.com" required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <Textarea rows={4} placeholder="Your message..." required />
      </div>

      <Button type="submit" className="w-full rounded-full">
        Send Message
      </Button>
    </motion.form>
  );
}
