import { Skeleton } from "@/components/ui/skeleton";

import { EventMetaSkeleton } from "./event-meta";

export function BookerSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border bg-card shadow-sm md:grid-cols-[minmax(260px,1fr)_minmax(0,1.4fr)_minmax(220px,1fr)]">
      <div className="border-b md:border-b-0 md:border-r">
        <EventMetaSkeleton />
      </div>
      <div className="flex items-center justify-center border-b p-6 md:border-b-0 md:border-r">
        <Skeleton className="h-72 w-full" />
      </div>
      <div className="flex flex-col gap-2 p-6">
        {["a", "b", "c", "d", "e", "f"].map((id) => (
          <Skeleton key={id} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}
