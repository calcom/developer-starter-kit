"use server";

import { revalidateTag } from "next/cache";

import { cancelBooking } from "@/lib/cal-api/bookings";
import { CalApiError } from "@/lib/cal-api/client";

export type CancelResult = { ok: true } | { ok: false; error: string };

export async function cancelBookingAction(params: {
  uid: string;
  reason?: string;
}): Promise<CancelResult> {
  try {
    await cancelBooking(params.uid, params.reason);
    revalidateTag(`booking-${params.uid}`, "default");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof CalApiError
          ? error.message
          : "Could not cancel the booking. Please try again.",
    };
  }
}
