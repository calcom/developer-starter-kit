"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { buildActionUrl, evaluateRoutingForm } from "@/lib/routing-forms/evaluate";
import type { RoutingForm, RoutingRuleAction } from "@/lib/routing-forms/types";

type RoutingFormRendererProps = {
  form: RoutingForm;
};

export function RoutingFormRenderer({ form }: RoutingFormRendererProps) {
  const router = useRouter();
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [outcome, setOutcome] = useState<RoutingRuleAction | null>(null);
  const [isPending, startTransition] = useTransition();

  function setValue(id: string, value: string) {
    setResponses((current) => ({ ...current, [id]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    for (const field of form.fields) {
      if (field.required && !responses[field.id]) {
        nextErrors[field.id] = "Required";
      }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startTransition(() => {
      const action = evaluateRoutingForm(form, responses);
      const href = buildActionUrl(action);
      if (href) {
        router.push(href);
        return;
      }
      setOutcome(action);
    });
  }

  if (outcome && outcome.kind === "message") {
    return (
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>{outcome.title}</CardTitle>
          {outcome.description ? <CardDescription>{outcome.description}</CardDescription> : null}
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle>{form.title}</CardTitle>
        {form.description ? <CardDescription>{form.description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit}>
          {form.fields.map((field) => {
            const error = errors[field.id];
            const id = `field-${field.id}`;
            return (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={id}>
                  {field.label}
                  {field.required ? <span className="ml-0.5 text-destructive">*</span> : null}
                </Label>

                {field.type === "text" || field.type === "email" ? (
                  <Input
                    id={id}
                    type={field.type === "email" ? "email" : "text"}
                    placeholder={field.placeholder}
                    value={responses[field.id] ?? ""}
                    onChange={(event) => setValue(field.id, event.target.value)}
                  />
                ) : field.type === "textarea" ? (
                  <Textarea
                    id={id}
                    placeholder={field.placeholder}
                    rows={3}
                    value={responses[field.id] ?? ""}
                    onChange={(event) => setValue(field.id, event.target.value)}
                  />
                ) : field.type === "select" ? (
                  <Select
                    value={responses[field.id] ?? ""}
                    onValueChange={(value) => setValue(field.id, value)}
                  >
                    <SelectTrigger id={id}>
                      <SelectValue placeholder={field.placeholder ?? "Pick an option"} />
                    </SelectTrigger>
                    <SelectContent>
                      {(field.options ?? []).map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : null}

                {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
              </div>
            );
          })}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" /> Routing
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
