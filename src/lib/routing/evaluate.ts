import type { Routing, RoutingAction } from "./types";

export function evaluateRouting(
  routing: Routing,
  responses: Record<string, string>,
): RoutingAction {
  for (const rule of routing.rules) {
    const matches = rule.when.every(
      (condition) => responses[condition.fieldId] === condition.equals,
    );
    if (matches) return rule.outcome;
  }
  return routing.fallback;
}

export function buildActionUrl(action: RoutingAction): string | null {
  switch (action.kind) {
    case "event-type":
      return `/book/${action.username}/${action.eventSlug}`;
    case "url":
      return action.url;
    case "message":
      return null;
  }
}
