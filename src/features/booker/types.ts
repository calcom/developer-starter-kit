import type { Booking, EventType, Slot } from "@/lib/cal-api/types";

export type BookerStep = "select_date" | "attendee_form" | "confirmation";

export type BookerSnapshot = {
  step: BookerStep;
  selectedDate: string | null;
  selectedSlot: Slot | null;
  timeFormat: "12h" | "24h";
  timeZone: string;
  confirmedBooking: Booking | null;
};

export type BookerProps = {
  eventType: EventType;
  username: string;
  rescheduleBookingUid?: string;
  initialTimeZone?: string;
};
