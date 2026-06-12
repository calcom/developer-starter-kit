"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = false, ...props }: CalendarProps) {
  const defaults = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("relative w-full p-3 sm:p-4", className)}
      classNames={{
        ...defaults,
        months: cn(defaults.months, "flex w-full flex-col gap-4 sm:flex-row"),
        month: cn(defaults.month, "flex w-full flex-col gap-5"),
        month_caption: cn(defaults.month_caption, "flex h-9 items-center justify-center"),
        caption_label: cn(defaults.caption_label, "text-base font-semibold tracking-tight"),
        nav: cn(
          defaults.nav,
          "pointer-events-none absolute left-3 right-3 top-3 z-10 flex h-9 items-center justify-between sm:left-4 sm:right-4 sm:top-4",
        ),
        button_previous: cn(
          defaults.button_previous,
          "pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-emphasis hover:text-foreground transition-colors disabled:opacity-30",
        ),
        button_next: cn(
          defaults.button_next,
          "pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-emphasis hover:text-foreground transition-colors disabled:opacity-30",
        ),
        month_grid: cn(defaults.month_grid, "w-full table-fixed border-collapse"),
        weekdays: cn(defaults.weekdays, "flex w-full gap-1"),
        weekday: cn(
          defaults.weekday,
          "text-muted-foreground flex-1 h-8 font-medium text-[0.7rem] uppercase tracking-wider",
        ),
        week: cn(defaults.week, "mt-1 flex w-full gap-1"),
        day: cn(defaults.day, "relative flex-1 p-0 text-center text-sm aspect-square"),
        day_button: cn(
          defaults.day_button,
          "calendar-day-btn inline-flex h-full w-full items-center justify-center p-0 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:text-muted-foreground disabled:opacity-40",
        ),
        selected: cn(
          defaults.selected,
          "[&_button]:bg-primary [&_button]:text-primary-foreground [&_button]:hover:bg-primary [&_button]:hover:text-primary-foreground",
        ),
        today: cn(
          defaults.today,
          "[&_button]:relative [&_button]:after:absolute [&_button]:after:left-1/2 [&_button]:after:-translate-x-1/2 [&_button]:after:bottom-1 [&_button]:after:h-1 [&_button]:after:w-1 [&_button]:after:rounded-full [&_button]:after:bg-primary [&_button[aria-selected=true]]:after:bg-primary-foreground",
        ),
        outside: cn(defaults.outside, "text-muted-foreground opacity-50"),
        disabled: cn(defaults.disabled, "text-muted-foreground opacity-30"),
        hidden: cn(defaults.hidden, "invisible"),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) => {
          if (orientation === "left") {
            return <ChevronLeft className="h-4 w-4" {...chevronProps} />;
          }
          return <ChevronRight className="h-4 w-4" {...chevronProps} />;
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
