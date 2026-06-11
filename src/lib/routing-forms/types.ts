export type RoutingFormFieldType = "text" | "email" | "select" | "multiselect" | "textarea";

export type RoutingFormFieldOption = {
  value: string;
  label: string;
};

export type RoutingFormField = {
  id: string;
  type: RoutingFormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: RoutingFormFieldOption[];
};

export type RoutingRuleAction =
  | { kind: "event-type"; username: string; eventSlug: string }
  | { kind: "url"; url: string }
  | { kind: "message"; title: string; description?: string };

export type RoutingRule = {
  when: Array<{ fieldId: string; equals: string }>;
  outcome: RoutingRuleAction;
};

export type RoutingForm = {
  id: string;
  title: string;
  description?: string;
  fields: RoutingFormField[];
  routes: RoutingRule[];
  fallback: RoutingRuleAction;
};
