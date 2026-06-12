"use client";

import { formatInTimeZone } from "date-fns-tz";
import { CalendarCheckIcon, ClockIcon, GlobeIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CancelBookingDialog } from "@/features/booking/cancel-booking-dialog";
import type { Booking } from "@/lib/cal-api/types";

type BookingConfirmationProps = {
  booking: Booking;
  timeZone: string;
  timeFormat: "12h" | "24h";
  username?: string;
  eventTypeSlug?: string;
};

export function BookingConfirmation({
  booking,
  timeZone,
  timeFormat,
  username,
  eventTypeSlug,
}: BookingConfirmationProps) {
  const formatPattern = timeFormat === "12h" ? "h:mm a" : "HH:mm";
  const rescheduleHref =
    username && eventTypeSlug
      ? `/book/${username}/${eventTypeSlug}?rescheduleUid=${booking.uid}`
      : null;
  const isLive = booking.status === "accepted" || booking.status === "pending";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emphasis text-foreground">
        <CalendarCheckIcon className="size-7" />
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          {booking.status === "pending" ? "Almost there" : "You're booked"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {booking.status === "pending"
            ? "The host needs to confirm. You will receive an email update."
            : `We sent a confirmation to ${booking.attendees[0]?.email ?? "your email"}.`}
        </p>
      </div>

      <Separator />

      <dl className="grid w-full max-w-sm gap-3 text-left text-sm">
        <Row icon={<CalendarCheckIcon className="size-4" />} label="What">
          {booking.title}
        </Row>
        <Row icon={<ClockIcon className="size-4" />} label="When">
          {formatInTimeZone(new Date(booking.start), timeZone, "EEE, MMM d · ")}
          {formatInTimeZone(new Date(booking.start), timeZone, formatPattern)}
        </Row>
        <Row icon={<GlobeIcon className="size-4" />} label="Timezone">
          {timeZone}
        </Row>
      </dl>

      {isLive ? (
        <div className="flex flex-wrap justify-center gap-2">
          {rescheduleHref ? (
            <Button asChild variant="outline">
              <Link href={rescheduleHref}>Reschedule</Link>
            </Button>
          ) : null}
          <CancelBookingDialog bookingUid={booking.uid} triggerLabel="Cancel booking" />
        </div>
      ) : null}
    </div>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 text-muted-foreground">{icon}</span>
      <div>
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="font-medium text-foreground">{children}</dd>
      </div>
    </div>
  );
}
