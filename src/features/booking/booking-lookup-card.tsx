"use client";

import { ArrowRightIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function BookingLookupCard() {
  const router = useRouter();
  const [uid, setUid] = useState("");
  const trimmed = uid.trim();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trimmed) return;
    router.push(`/booking/${encodeURIComponent(trimmed)}`);
  }

  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <SettingsIcon className="size-4" /> Manage
        </div>
        <CardTitle>Attendee management</CardTitle>
        <CardDescription>
          View, reschedule or cancel an existing booking by its UID.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <Input
            value={uid}
            onChange={(event) => setUid(event.target.value)}
            placeholder="Booking UID"
            aria-label="Booking UID"
            spellCheck={false}
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={!trimmed} aria-label="Open booking">
            <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
