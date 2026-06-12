import { notFound } from "next/navigation";

import { RoutingRenderer } from "@/features/routing/routing-renderer";
import { getRouting } from "@/lib/routing/registry";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const routing = getRouting(id);
  return { title: routing?.title ?? "Routing" };
}

export default async function RoutingPage({ params }: PageProps) {
  const { id } = await params;
  const routing = getRouting(id);
  if (!routing) notFound();

  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6">
      <RoutingRenderer routing={routing} />
    </main>
  );
}
