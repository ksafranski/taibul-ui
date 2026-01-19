"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { Calendar } from './Calendar';
import { TimePicker } from './TimePicker';

export type DateValue = Date | { from: Date; to?: Date } | undefined;

const isRange = (value: DateValue): value is { from: Date; to?: Date } => {
  return value !== null && typeof value === 'object' && 'from' in value;
};

interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  mode?: 'date' | 'time' | 'datetime' | 'range';
  value?: DateValue;
  defaultValue?: DateValue;
  onChange?: (value: DateValue, e?: React.SyntheticEvent) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  required?: boolean;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(({
  mode = 'date',
  value,
  defaultValue,
  onChange,
  label,
  placeholder,
  error,
  className = "",
  required,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
  
  // Initialize with value if present, otherwise defaultValue
  const [internalValue, setInternalValue] = useState<DateValue>(
    value !== undefined ? value : defaultValue
  );

  // Sync internal value with controlled value prop if it changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Helper to update value
  const updateValue = (newValue: DateValue, e?: React.SyntheticEvent) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue, e);
  };

  // Default placeholders
  const defaultPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    switch (mode) {
      case 'date': return 'Select date...';
      case 'time': return 'Select time...';
      case 'datetime': return 'Select date & time...';
      case 'range': return 'Select date range...';
      default: return 'Select...';
    }
  }, [mode, placeholder]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDate = (date: Date) => {
    // Note: Calendar component doesn't usually provide an event object for date selection
    // We'll create a synthetic-like one or just pass undefined for now, as Calendar.tsx would need updates to forward event
    
    if (mode === 'range') {
      const current = isRange(internalValue) ? internalValue : { from: undefined, to: undefined };
      if (!current.from || (current.from && current.to)) {
        updateValue({ from: date, to: undefined });
      } else {
        const from = current.from;
        const to = date;
        if (to < from) {
          updateValue({ from: to, to: from });
        } else {
          updateValue({ from, to });
          setIsOpen(false);
        }
      }
    } else if (mode === 'datetime') {
      // Keep existing time if any
      const existingDate = internalValue instanceof Date ? internalValue : new Date();
      const newDate = new Date(date);
      newDate.setHours(existingDate.getHours());
      newDate.setMinutes(existingDate.getMinutes());
      updateValue(newDate);
    } else {
      updateValue(date);
      setIsOpen(false);
    }
  };

  const handleSelectTime = (timeStr: string) => {
    // TimePicker also doesn't return an event currently
    const [hours, minutes] = timeStr.split(':').map(Number);
    if (mode === 'time') {
      const d = new Date();
      d.setHours(hours, minutes, 0, 0);
      updateValue(d);
    } else if (mode === 'datetime') {
      const d = internalValue instanceof Date ? new Date(internalValue) : new Date();
      d.setHours(hours, minutes, 0, 0);
      updateValue(d);
    }
  };

  const formattedValue = useMemo(() => {
    if (!internalValue) return "";
    if (mode === 'range' && isRange(internalValue)) {
      const { from, to } = internalValue;
      if (!from) return "";
      return `${format(from, "MMM d, yyyy")}${to ? ` - ${format(to, "MMM d, yyyy")}` : ""}`;
    }
    if (!(internalValue instanceof Date) || !isValid(internalValue)) return "";
    
    switch (mode) {
      case 'date': return format(internalValue, "MMMM d, yyyy");
      case 'time': return format(internalValue, "h:mm aa");
      case 'datetime': return format(internalValue, "MMM d, yyyy h:mm aa");
      default: return "";
    }
  }, [internalValue, mode]);

  const clearValue = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateValue(undefined, e);
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full relative ${className}`} ref={containerRef} {...props}>
      {label && (
        <label className="text-sm font-medium leading-none pl-[3px] mb-[5px]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex w-full border border-input bg-background ring-offset-background h-12 px-4 items-center gap-3 rounded-lg cursor-pointer transition-all text-left
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            ${error ? 'border-red-500' : ''}
            ${!formattedValue ? 'text-muted-foreground' : 'text-foreground'}
          `}
        >
          {mode === 'time' ? <Clock size={18} className="text-muted-foreground" /> : <CalendarIcon size={18} className="text-muted-foreground" />}
          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {formattedValue || defaultPlaceholder}
          </span>
          {formattedValue && (
            <X 
              size={16} 
              className="text-muted-foreground hover:text-foreground transition-colors" 
              onClick={clearValue}
            />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-50 bg-background border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 min-w-[280px]">
            {mode !== 'time' && (
              <Calendar 
                selected={internalValue} 
                onSelect={handleSelectDate} 
                range={mode === 'range'}
              />
            )}
            {(mode === 'time' || mode === 'datetime') && (
              <>
                <TimePicker 
                  value={internalValue instanceof Date && isValid(internalValue) ? format(internalValue, "HH:mm") : "12:00"}
                  onChange={handleSelectTime}
                />
                <div className="p-3 border-t border-border bg-accent/30 flex justify-end">
                  <button 
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-bold text-primary hover:underline px-2 py-1 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
            {mode === 'range' && isRange(internalValue) && internalValue.from && internalValue.to && (
              <div className="p-3 border-t border-border bg-accent/30 flex justify-end">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-primary hover:underline px-2 py-1 cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1 pl-[3px]">{error}</p>}
    </div>
  );
});

DatePicker.displayName = "DatePicker";
