"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const defaults = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        ...defaults,
        months: cn(defaults.months, "flex flex-col sm:flex-row gap-2"),
        month: cn(defaults.month, "flex flex-col gap-4"),
        month_caption: cn(defaults.month_caption, "flex justify-center pt-1 relative items-center"),
        caption_label: cn(defaults.caption_label, "text-sm font-medium"),
        nav: cn(defaults.nav, "flex items-center gap-1"),
        button_previous: cn(
          defaults.button_previous,
          "absolute left-1 inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent p-0 opacity-70 transition-opacity hover:opacity-100",
        ),
        button_next: cn(
          defaults.button_next,
          "absolute right-1 inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent p-0 opacity-70 transition-opacity hover:opacity-100",
        ),
        month_grid: cn(defaults.month_grid, "w-full border-collapse space-y-1"),
        weekdays: cn(defaults.weekdays, "flex"),
        weekday: cn(
          defaults.weekday,
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        ),
        week: cn(defaults.week, "flex w-full mt-2"),
        day: cn(defaults.day, "h-9 w-9 text-center text-sm p-0 relative"),
        day_button: cn(
          defaults.day_button,
          "inline-flex h-9 w-9 items-center justify-center rounded-md p-0 text-sm font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-30",
        ),
        selected: cn(
          defaults.selected,
          "[&_button]:bg-primary [&_button]:text-primary-foreground [&_button]:hover:bg-primary [&_button]:hover:text-primary-foreground",
        ),
        today: cn(defaults.today, "[&_button]:bg-accent [&_button]:text-accent-foreground"),
        outside: cn(defaults.outside, "text-muted-foreground opacity-50"),
        disabled: cn(defaults.disabled, "text-muted-foreground opacity-50"),
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
