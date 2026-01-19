"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, options, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium leading-none pl-[3px] mb-[5px]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`appearance-none flex w-full border border-input bg-background ring-offset-background placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all h-12 px-4 pr-10 text-base rounded-lg cursor-pointer ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
          size={18} 
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1 pl-[3px]">{error}</p>}
    </div>
  );
});

Select.displayName = "Select";
