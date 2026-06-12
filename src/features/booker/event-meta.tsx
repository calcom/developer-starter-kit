"use client";

import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { CalendarIcon, ClockIcon, GlobeIcon, MapPinIcon } from "lucide-react";

import { Avatar } from "@/components/avatar";
import type { EventType, Slot } from "@/lib/cal-api/types";
import { TimezonePicker } from "./timezone-picker";
import { buildLocationDescription } from "./utils";

type EventMetaProps = {
  eventType: EventType;
  selectedSlot: Slot | null;
  timeZone: string;
  onTimeZoneChange?: (timeZone: string) => void;
  timeFormat: "12h" | "24h";
  formerSlotStart?: string | null;
};

export function EventMeta({
  eventType,
  selectedSlot,
  timeZone,
  onTimeZoneChange,
  timeFormat,
  formerSlotStart,
}: EventMetaProps) {
  const host = eventType.users?.[0] ?? eventType.hosts?.[0];
  const location = eventType.locations?.[0];

  return (
    <div className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <Avatar name={host?.name ?? host?.username ?? "Host"} src={host?.avatarUrl} />
        <p className="text-sm font-medium text-muted-foreground">
          {host?.name ?? host?.username ?? "Host"}
        </p>
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{eventType.title}</h1>
        {eventType.description ? (
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {eventType.description}
          </p>
        ) : null}
      </div>

      <ul className="flex flex-col gap-3 text-sm">
        {formerSlotStart ? (
          <MetaRow icon={<CalendarIcon className="size-4" />}>
            <span className="line-through opacity-70">
              {formatInTimeZone(new Date(formerSlotStart), timeZone, "EEE, MMM d · ")}
              {formatInTimeZone(
                new Date(formerSlotStart),
                timeZone,
                timeFormat === "12h" ? "h:mm a" : "HH:mm",
              )}
            </span>
          </MetaRow>
        ) : null}

        {selectedSlot ? (
          <MetaRow icon={<CalendarIcon className="size-4" />}>
            <span className="font-medium">
              {formatInTimeZone(new Date(selectedSlot.start), timeZone, "EEE, MMM d · ")}
              {formatInTimeZone(
                new Date(selectedSlot.start),
                timeZone,
                timeFormat === "12h" ? "h:mm a" : "HH:mm",
              )}
            </span>
          </MetaRow>
        ) : null}

        <MetaRow icon={<ClockIcon className="size-4" />}>
          {eventType.lengthInMinutes} minutes
        </MetaRow>

        {location ? (
          <MetaRow icon={<MapPinIcon className="size-4" />}>
            {buildLocationDescription(location.type)}
          </MetaRow>
        ) : null}

        <MetaRow icon={<GlobeIcon className="size-4" />}>
          {onTimeZoneChange ? (
            <TimezonePicker value={timeZone} onChange={onTimeZoneChange} />
          ) : (
            <span>{timeZone}</span>
          )}
        </MetaRow>
      </ul>
    </div>
  );
}

function MetaRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-foreground">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <span className="leading-tight">{children}</span>
    </li>
  );
}

export function EventMetaSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 animate-pulse rounded-full bg-emphasis" />
        <div className="h-3 w-24 animate-pulse rounded bg-emphasis" />
      </div>
      <div className="space-y-3">
        <div className="h-5 w-3/4 animate-pulse rounded bg-emphasis" />
        <div className="h-3 w-full animate-pulse rounded bg-emphasis" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-emphasis" />
      </div>
      <div className="space-y-3">
        <div className="h-3 w-1/2 animate-pulse rounded bg-emphasis" />
        <div className="h-3 w-2/5 animate-pulse rounded bg-emphasis" />
      </div>
    </div>
  );
}

export { format };
