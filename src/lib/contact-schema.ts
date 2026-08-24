import { z } from "zod";

/**
 * Shared by the client form and the route handler so validation cannot drift.
 * The limits mirror the `messages` rules in `firestore.rules` — a payload that
 * passes here must also pass there.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(200, "Email must be 200 characters or fewer.")
    .email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
  /**
   * Honeypot. Real people never see this field, so anything in it is a bot.
   *
   * Deliberately unconstrained: if the schema rejected a filled honeypot, the
   * caller would get a validation error telling the bot exactly which field
   * gave it away. Instead it validates fine and the route handler quietly
   * discards the submission while reporting success.
   */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
