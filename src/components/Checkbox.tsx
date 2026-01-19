"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string; // Explicitly adding className prop type
  [key: string]: any; // Allow other props
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ label, className = '', checked, defaultChecked, onChange, style, ...props }, ref) => {
  const [internalChecked, setInternalChecked] = React.useState(
    checked !== undefined ? checked : defaultChecked || false
  );

  React.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked, e);
  };
  
  return (
    <label className={`flex items-center gap-3 cursor-pointer group select-none ${className}`} style={style}>
      <div className="relative flex items-center justify-center">
        <input 
          type="checkbox" 
          className="peer sr-only" 
          checked={internalChecked}
          onChange={handleChange}
          ref={ref}
          {...props} 
        />
        <div className="w-5 h-5 border-2 border-border rounded transition-all peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50" />

        <Check 
          size={14} 
          className="absolute text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100" 
          strokeWidth={3}
        />
      </div>
      {label && <span className="text-sm font-medium">{label}</span>}
    </label>
  );
});

Checkbox.displayName = "Checkbox";
