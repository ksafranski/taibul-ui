"use client";

import React from 'react';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ label, className = '', checked, defaultChecked, onChange, ...props }, ref) => {
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
    <label className={`flex items-center gap-3 cursor-pointer group select-none ${className}`}>
      <div className="relative">
        <input 
          ref={ref} 
          type="checkbox" 
          className="peer sr-only" 
          checked={internalChecked}
          onChange={handleChange}
          {...props} 
        />
        <div className="w-10 h-6 bg-input rounded-full transition-colors peer-checked:bg-primary" />
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
      </div>
      {label && <span className="text-sm font-medium">{label}</span>}
    </label>
  );
});

Switch.displayName = "Switch";
