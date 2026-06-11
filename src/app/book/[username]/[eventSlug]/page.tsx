import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Booker } from "@/features/booker/booker";
import { BookerSkeleton } from "@/features/booker/booker-skeleton";
import { getEventType } from "@/lib/cal-api/event-types";

type PageProps = {
  params: Promise<{ username: string; eventSlug: string }>;
  searchParams: Promise<{ rescheduleUid?: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { username, eventSlug } = await params;
  return {
    title: `Book a ${eventSlug} with ${username}`,
  };
}

export default async function BookerPage({ params, searchParams }: PageProps) {
  const { username, eventSlug } = await params;
  const { rescheduleUid } = await searchParams;

  const eventType = await getEventType({ username, eventSlug });
  if (!eventType) notFound();

  return (
    <main className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-12">
      <Suspense fallback={<BookerSkeleton />}>
        <Booker eventType={eventType} username={username} rescheduleBookingUid={rescheduleUid} />
      </Suspense>
    </main>
  );
}
