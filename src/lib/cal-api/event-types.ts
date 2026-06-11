import "server-only";

import { calApi } from "./client";
import type { EventType } from "./types";

export async function listEventTypes(params: {
  username: string;
  eventSlug?: string;
}): Promise<EventType[]> {
  return calApi<EventType[]>("/event-types", {
    query: { username: params.username, eventSlug: params.eventSlug },
    next: { revalidate: 60, tags: ["event-types", params.username] },
  });
}

export async function getEventType(params: {
  username: string;
  eventSlug: string;
}): Promise<EventType | null> {
  const matches = await listEventTypes(params);
  return matches[0] ?? null;
}

export async function getEventTypeById(eventTypeId: number): Promise<EventType> {
  return calApi<EventType>(`/event-types/${eventTypeId}`, {
    next: { revalidate: 60, tags: [`event-type-${eventTypeId}`] },
  });
}
