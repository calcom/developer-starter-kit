import { notFound } from "next/navigation";

import { RoutingFormRenderer } from "@/features/routing-form/routing-form-renderer";
import { getRoutingForm } from "@/lib/routing-forms/registry";

type PageProps = { params: Promise<{ formId: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { formId } = await params;
  const form = getRoutingForm(formId);
  return { title: form?.title ?? "Routing form" };
}

export default async function RoutingFormPage({ params }: PageProps) {
  const { formId } = await params;
  const form = getRoutingForm(formId);
  if (!form) notFound();

  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6">
      <RoutingFormRenderer form={form} />
    </main>
  );
}
