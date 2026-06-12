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
      className={cn("p-4", className)}
      classNames={{
        ...defaults,
        months: cn(defaults.months, "flex flex-col sm:flex-row gap-4"),
        month: cn(defaults.month, "flex flex-col gap-5"),
        month_caption: cn(
          defaults.month_caption,
          "relative flex items-center justify-center pt-1 h-9",
        ),
        caption_label: cn(defaults.caption_label, "text-base font-semibold tracking-tight"),
        nav: cn(defaults.nav, "flex items-center gap-1"),
        button_previous: cn(
          defaults.button_previous,
          "absolute left-0 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-emphasis hover:text-foreground transition-colors disabled:opacity-30",
        ),
        button_next: cn(
          defaults.button_next,
          "absolute right-0 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-emphasis hover:text-foreground transition-colors disabled:opacity-30",
        ),
        month_grid: cn(defaults.month_grid, "w-full border-collapse"),
        weekdays: cn(defaults.weekdays, "flex"),
        weekday: cn(
          defaults.weekday,
          "text-muted-foreground w-11 h-8 font-medium text-[0.7rem] uppercase tracking-wider",
        ),
        week: cn(defaults.week, "flex w-full mt-1"),
        day: cn(defaults.day, "h-11 w-11 text-center text-sm p-0 relative"),
        day_button: cn(
          defaults.day_button,
          "inline-flex h-10 w-10 items-center justify-center rounded-full p-0 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:text-muted-foreground disabled:opacity-40",
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
