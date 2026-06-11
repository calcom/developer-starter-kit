import { notFound } from "next/navigation";

import { BookingDetails } from "@/features/booking/booking-details";
import { getBooking } from "@/lib/cal-api/bookings";
import { CalApiError } from "@/lib/cal-api/client";
import type { Booking } from "@/lib/cal-api/types";

type PageProps = { params: Promise<{ uid: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { uid } = await params;
  return { title: `Booking ${uid}` };
}

export default async function ManageBookingPage({ params }: PageProps) {
  const { uid } = await params;

  let booking: Booking;
  try {
    booking = await getBooking(uid);
  } catch (error) {
    if (error instanceof CalApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <BookingDetails booking={booking} />
    </main>
  );
}
