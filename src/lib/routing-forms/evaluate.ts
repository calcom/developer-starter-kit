import type { RoutingForm, RoutingRuleAction } from "./types";

export function evaluateRoutingForm(
  form: RoutingForm,
  responses: Record<string, string>,
): RoutingRuleAction {
  for (const route of form.routes) {
    const matches = route.when.every(
      (condition) => responses[condition.fieldId] === condition.equals,
    );
    if (matches) return route.outcome;
  }
  return form.fallback;
}

export function buildActionUrl(action: RoutingRuleAction): string | null {
  switch (action.kind) {
    case "event-type":
      return `/book/${action.username}/${action.eventSlug}`;
    case "url":
      return action.url;
    case "message":
      return null;
  }
}
