import { formatInTimeZone } from "date-fns-tz";
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  GlobeIcon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Booking } from "@/lib/cal-api/types";

import { CancelBookingDialog } from "./cancel-booking-dialog";

type BookingDetailsProps = {
  booking: Booking;
};

export function BookingDetails({ booking }: BookingDetailsProps) {
  const isCancelled = booking.status === "cancelled" || booking.status === "rejected";
  const isPending = booking.status === "pending" || booking.status === "awaiting_host";
  const attendee = booking.attendees[0];
  const host = booking.hosts[0];
  const timeZone = attendee?.timeZone ?? "UTC";
  const formatPattern = "EEE, MMM d · HH:mm";

  const rescheduleHref =
    host?.username && booking.eventType?.slug
      ? `/book/${host.username}/${booking.eventType.slug}?rescheduleUid=${booking.uid}`
      : null;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <StatusBadge status={booking.status} />
        </div>
        <CardTitle className="text-2xl">{booking.title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 pt-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field icon={<CalendarIcon className="size-4" />} label="When">
            {formatInTimeZone(new Date(booking.start), timeZone, formatPattern)}
          </Field>
          <Field icon={<ClockIcon className="size-4" />} label="Duration">
            {booking.duration} minutes
          </Field>
          {host ? (
            <Field icon={<UserIcon className="size-4" />} label="Host">
              {host.name}
            </Field>
          ) : null}
          <Field icon={<GlobeIcon className="size-4" />} label="Timezone">
            {timeZone}
          </Field>
        </dl>

        {booking.location ? (
          <div className="rounded-lg border bg-muted/40 p-4 text-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Location
            </p>
            <p className="mt-1 break-all font-medium">{booking.location}</p>
          </div>
        ) : null}

        {!isCancelled ? (
          <div className="flex flex-wrap items-center gap-2">
            {rescheduleHref ? (
              <Button asChild variant="outline">
                <Link href={rescheduleHref}>Reschedule</Link>
              </Button>
            ) : null}
            <CancelBookingDialog bookingUid={booking.uid} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">This booking is no longer active.</p>
        )}

        {isPending ? (
          <p className="text-sm text-muted-foreground">Waiting for the host to confirm.</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Field({
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
        <dd className="text-sm font-medium">{children}</dd>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Booking["status"] }) {
  const map: Record<
    Booking["status"],
    { label: string; icon: React.ReactNode; className: string }
  > = {
    accepted: {
      label: "Confirmed",
      icon: <CheckCircle2Icon className="size-3.5" />,
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/30 dark:text-emerald-300",
    },
    awaiting_host: {
      label: "Awaiting host",
      icon: <ClockIcon className="size-3.5" />,
      className:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/30 dark:text-amber-300",
    },
    pending: {
      label: "Pending",
      icon: <ClockIcon className="size-3.5" />,
      className:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/30 dark:text-amber-300",
    },
    cancelled: {
      label: "Cancelled",
      icon: <XCircleIcon className="size-3.5" />,
      className:
        "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    },
    rejected: {
      label: "Rejected",
      icon: <XCircleIcon className="size-3.5" />,
      className:
        "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-900/30 dark:text-rose-300",
    },
  };
  const meta = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${meta.className}`}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}
