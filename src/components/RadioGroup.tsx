"use client";

import React from 'react';

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  name: string;
  options: { label: string; value: string }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ name, options, value, defaultValue, onChange, className = '', ...props }, ref) => {
  // Initialize with value if present, otherwise defaultValue, otherwise undefined
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    value !== undefined ? value : defaultValue
  );

  // Sync internal value with controlled value prop if it changes
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (newValue: string, e?: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue, e);
  };

  return (
    <div ref={ref} className={`flex flex-col gap-3 ${className}`} {...props}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-3 cursor-pointer group select-none">
          <div className="relative flex items-center justify-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={internalValue === option.value}
              onChange={(e) => handleChange(option.value, e)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 border-2 border-border rounded-full transition-all peer-checked:border-primary group-hover:border-primary/50" />

            <div className="absolute w-2.5 h-2.5 bg-primary rounded-full opacity-0 transition-opacity peer-checked:opacity-100" />
          </div>
          <span className="text-sm font-medium">{option.label}</span>
        </label>
      ))}
    </div>
  );
});

RadioGroup.displayName = "RadioGroup";
