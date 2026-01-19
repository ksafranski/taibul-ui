"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isToday,
  isWithinInterval
} from 'date-fns';

interface CalendarProps {
  selected?: Date | { from: Date; to?: Date };
  onSelect?: (date: Date) => void;
  className?: string;
  range?: boolean;
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>>(({ selected, onSelect, className = "", range = false, ...props }, ref) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let daysArray = [];
  let day = startDate;

  const handleDateClick = (clickedDay: Date) => {
    onSelect?.(clickedDay);
  };

  const isSelected = (date: Date) => {
    if (!selected) return false;
    if (selected instanceof Date) {
      return isSameDay(date, selected);
    }
    if ('from' in selected) {
      return isSameDay(date, selected.from) || (selected.to && isSameDay(date, selected.to));
    }
    return false;
  };

  const isInRange = (date: Date) => {
    if (!range || !selected || selected instanceof Date || !('from' in selected) || !selected.to) return false;
    return isWithinInterval(date, { start: selected.from, end: selected.to });
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const isDisabled = !isSameMonth(day, monthStart);
      const selectedStatus = isSelected(day);
      const rangeStatus = isInRange(day);
      const todayStatus = isToday(day);

      daysArray.push(
        <button
          key={day.toString()}
          type="button"
          onClick={() => handleDateClick(cloneDay)}
          className={`
            relative h-10 w-10 p-0 font-normal text-sm flex items-center justify-center rounded-lg transition-all cursor-pointer
            ${isDisabled ? 'text-muted-foreground opacity-40 hover:opacity-100' : 'text-foreground'}
            ${selectedStatus ? 'bg-primary text-primary-foreground font-semibold scale-110 z-10' : 'hover:bg-accent hover:text-accent-foreground'}
            ${rangeStatus && !selectedStatus ? 'bg-accent/50 text-accent-foreground rounded-none first:rounded-l-lg last:rounded-r-lg' : ''}
            ${todayStatus && !selectedStatus ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : ''}
          `}
        >
          {format(day, "d")}
        </button>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-1" key={day.toString()}>
        {daysArray}
      </div>
    );
    daysArray = [];
  }

  return (
    <div ref={ref} className={`p-4 bg-background ${className}`} {...props}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-1 hover:bg-accent rounded-md transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1 hover:bg-accent rounded-md transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d) => (
          <div key={d} className="text-muted-foreground text-[10px] font-bold uppercase text-center w-10">
            {d}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {rows}
      </div>
    </div>
  );
});

Calendar.displayName = "Calendar";
