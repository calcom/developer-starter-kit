"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Booking, EventType, Slot } from "@/lib/cal-api/types";
import { createBookingAction, rescheduleBookingAction } from "./actions";

const schema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  notes: z.string().optional(),
  reschedulingReason: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type BookingFormProps = {
  eventType: EventType;
  slot: Slot;
  timeZone: string;
  rescheduleBookingUid?: string;
  onCancel: () => void;
  onConfirmed: (booking: Booking) => void;
};

export function BookingForm({
  eventType,
  slot,
  timeZone,
  rescheduleBookingUid,
  onCancel,
  onConfirmed,
}: BookingFormProps) {
  const [isPending, startTransition] = useTransition();
  const isReschedule = Boolean(rescheduleBookingUid);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", notes: "", reschedulingReason: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = isReschedule
        ? await rescheduleBookingAction({
            uid: rescheduleBookingUid!,
            start: slot.time,
            reschedulingReason: values.reschedulingReason,
            rescheduledBy: values.email,
          })
        : await createBookingAction({
            eventTypeId: eventType.id,
            start: slot.time,
            attendee: {
              name: values.name,
              email: values.email,
              timeZone,
            },
            bookingFieldsResponses: values.notes ? { notes: values.notes } : undefined,
          });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      onConfirmed(result.booking);
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex h-full flex-col gap-4 p-6 sm:p-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input autoComplete="name" placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isReschedule ? (
          <FormField
            control={form.control}
            name="reschedulingReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for rescheduling (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Let the host know what's changed" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional notes (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="What would you like to discuss?" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="mt-auto flex items-center justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>
            Back
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {isReschedule ? "Rescheduling" : "Confirming"}
              </>
            ) : isReschedule ? (
              "Reschedule"
            ) : (
              "Confirm booking"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
