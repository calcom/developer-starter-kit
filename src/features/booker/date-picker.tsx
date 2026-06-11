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
  const isDayDisabled = (day: Date) => {
    if (availableDays.size === 0) return false;
    return !availableDays.has(formatKey(day));
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
      weekStartsOn={0}
      className="w-full"
    />
  );
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
