import { BookerSkeleton } from "@/features/booker/booker-skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-12">
      <BookerSkeleton />
    </main>
  );
}
