import { getDefaultUsername } from "@/lib/cal-api/env";
import type { Routing } from "./types";

const username = getDefaultUsername() || "your-username";

const SALES_INTAKE: Routing = {
  id: "sales-intake",
  title: "Tell us about your project",
  description: "We'll route you to the right specialist on our team.",
  fields: [
    {
      id: "company-size",
      type: "select",
      label: "Company size",
      required: true,
      options: [
        { value: "1-10", label: "1–10 people" },
        { value: "11-50", label: "11–50 people" },
        { value: "51-200", label: "51–200 people" },
        { value: "200+", label: "200+ people" },
      ],
    },
    {
      id: "interest",
      type: "select",
      label: "What are you interested in?",
      required: true,
      options: [
        { value: "demo", label: "Product demo" },
        { value: "support", label: "Technical support" },
        { value: "partnerships", label: "Partnership opportunity" },
      ],
    },
    {
      id: "notes",
      type: "textarea",
      label: "Anything else we should know? (optional)",
      placeholder: "Tell us a bit more...",
    },
  ],
  rules: [
    {
      when: [{ fieldId: "interest", equals: "demo" }],
      outcome: { kind: "event-type", username, eventSlug: "30min" },
    },
    {
      when: [{ fieldId: "interest", equals: "support" }],
      outcome: { kind: "event-type", username, eventSlug: "15min" },
    },
  ],
  fallback: {
    kind: "message",
    title: "Thanks, we'll be in touch",
    description: "A member of our team will reach out shortly.",
  },
};

const ROUTINGS: Record<string, Routing> = {
  "sales-intake": SALES_INTAKE,
  "your-form-id": SALES_INTAKE,
};

export function getRouting(id: string): Routing | null {
  return ROUTINGS[id] ?? null;
}

export function listRoutings(): Routing[] {
  return Object.values(ROUTINGS);
}
