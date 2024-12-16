"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = false, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex w-full items-center justify-content",
        label: "text-sm font-normal",
        nav: "space-x-1 flex items-center mx-auto",
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-white p-0 opacity-50 hover:opacity-100"
        ),
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-white p-0 opacity-50 hover:opacity-100"
        ),
        previous: "absolute left-1",
        next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        row: "flex",
        // cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2 bg-gray-900",
        // cell: "h-6 w-6 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          // buttonVariants({ variant: "ghost" }),
          "h-6 w-6 p-0 font-normal aria-selected:opacity-100 px-4 py-2 text-center"
        ),
        range_end: "day-range-end",
        selected: cn(
          "dark:bg-white bg-primary duration-500 dark:text-black text-white hover:bg-blue-500 hover:text-white focus:bg-primary focus:text-white"
        ),
        today: cn("bg-accent text-accent-foreground rounded-md"),
        outside: cn(
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground"
        ),
        disabled: cn("text-black"),
        range_middle: cn(
          "rounded-[0px] dark:text-black text-white dark:bg-white bg-gray-900"
        ),
        // day_hidden: "invisible",
        // ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
