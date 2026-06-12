"use client";

import { Calendar } from "@/components/ui/calendar";

type DatePickerProps = {
  month: Date;
  onMonthChange: (date: Date) => void;
  selectedDate: Date | null;
  availableDays: Set<string>;
  onSelectDate: (date: Date) => void;
};

function formatKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function DatePicker({
  month,
  onMonthChange,
  selectedDate,
  availableDays,
  onSelectDate,
}: DatePickerProps) {
  const isAvailable = (day: Date) => availableDays.has(formatKey(day));
  const isDayDisabled = (day: Date) => {
    if (availableDays.size === 0) return false;
    return !isAvailable(day);
  };

  return (
    <Calendar
      mode="single"
      month={month}
      onMonthChange={onMonthChange}
      selected={selectedDate ?? undefined}
      onSelect={(date) => {
        if (date) onSelectDate(date);
      }}
      disabled={[(day: Date) => day < startOfToday() || isDayDisabled(day)]}
      modifiers={{ available: isAvailable }}
      modifiersClassNames={{
        available:
          "[&_button]:bg-emphasis [&_button]:text-foreground [&_button]:font-semibold [&_button]:hover:bg-accent",
      }}
      weekStartsOn={0}
      className="w-full"
    />
  );
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
