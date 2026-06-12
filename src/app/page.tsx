import { ArrowRightIcon, CalendarIcon, FormInputIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBrandName, getDefaultUsername } from "@/lib/cal-api/env";

export default function HomePage() {
  const username = getDefaultUsername();
  const brand = getBrandName();

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-16">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">{brand}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Cal.com Platform Starter
        </h1>
        <p className="max-w-2xl text-balance text-muted-foreground">
          A Next.js + shadcn template for embedding Cal.com Platform flows in your product. Every
          component lives in this repository. Customize the look, swap the auth, ship.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CalendarIcon className="size-4" /> Booker
            </div>
            <CardTitle>Public booking page</CardTitle>
            <CardDescription>
              Month calendar, time slots, attendee form, confirmation. The flagship flow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {username ? (
              <Button asChild>
                <Link href={`/book/${username}/30min`}>
                  Open /book/{username}/30min
                  <ArrowRightIcon />
                </Link>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Set{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  NEXT_PUBLIC_CAL_USERNAME
                </code>{" "}
                to enable.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <SettingsIcon className="size-4" /> Manage booking
            </div>
            <CardTitle>Attendee management</CardTitle>
            <CardDescription>
              View, reschedule or cancel an existing booking by its UID.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/booking/your-booking-uid">
                /booking/[uid]
                <ArrowRightIcon />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FormInputIcon className="size-4" /> Routing
            </div>
            <CardTitle>Conditional routing</CardTitle>
            <CardDescription>
              A form scaffold that maps responses to event types. See README for the org-API setup.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/routing/sales-intake">
                /routing/[id]
                <ArrowRightIcon />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-2xl border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold tracking-tight">Quickstart</h2>
        <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>
            1. Copy <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.example</code> to{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code> and add your{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">CAL_API_KEY</code>.
          </li>
          <li>
            2. Set{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">NEXT_PUBLIC_CAL_USERNAME</code>{" "}
            to your Cal.com username.
          </li>
          <li>
            3. <code className="rounded bg-muted px-1 py-0.5 text-xs">bun dev</code> and open this
            page.
          </li>
          <li>
            4. Tweak{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">src/features/booker</code> and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">src/components/ui</code> to match
            your brand.
          </li>
        </ol>
      </section>
    </main>
  );
}
