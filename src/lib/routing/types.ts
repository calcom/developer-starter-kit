export type RoutingFieldType = "text" | "email" | "select" | "multiselect" | "textarea";

export type RoutingFieldOption = {
  value: string;
  label: string;
};

export type RoutingField = {
  id: string;
  type: RoutingFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: RoutingFieldOption[];
};

export type RoutingAction =
  | { kind: "event-type"; username: string; eventSlug: string }
  | { kind: "url"; url: string }
  | { kind: "message"; title: string; description?: string };

export type RoutingRule = {
  when: Array<{ fieldId: string; equals: string }>;
  outcome: RoutingAction;
};

export type Routing = {
  id: string;
  title: string;
  description?: string;
  fields: RoutingField[];
  rules: RoutingRule[];
  fallback: RoutingAction;
};
