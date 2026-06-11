"use server";

import { revalidateTag } from "next/cache";

import { createBooking, rescheduleBooking } from "@/lib/cal-api/bookings";
import { CalApiError } from "@/lib/cal-api/client";
import { getAvailableSlots } from "@/lib/cal-api/slots";
import type { AvailableSlots, Booking, CreateBookingInput } from "@/lib/cal-api/types";

export type SlotsResult = { ok: true; slots: AvailableSlots } | { ok: false; error: string };

export async function fetchSlotsAction(params: {
  eventTypeId: number;
  start: string;
  end: string;
  timeZone: string;
}): Promise<SlotsResult> {
  try {
    const slots = await getAvailableSlots(params);
    return { ok: true, slots };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof CalApiError ? error.message : "Could not load availability",
    };
  }
}

export type BookingResult = { ok: true; booking: Booking } | { ok: false; error: string };

export async function createBookingAction(input: CreateBookingInput): Promise<BookingResult> {
  try {
    const booking = await createBooking(input);
    revalidateTag(`booking-${booking.uid}`, "default");
    return { ok: true, booking };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof CalApiError
          ? error.message
          : "Could not create the booking. Please try again.",
    };
  }
}

export async function rescheduleBookingAction(params: {
  uid: string;
  start: string;
  reschedulingReason?: string;
  rescheduledBy?: string;
}): Promise<BookingResult> {
  try {
    const booking = await rescheduleBooking(params);
    revalidateTag(`booking-${params.uid}`, "default");
    return { ok: true, booking };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof CalApiError ? error.message : "Could not reschedule the booking.",
    };
  }
}
