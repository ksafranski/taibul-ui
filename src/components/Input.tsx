"use client";

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  format?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, type, required, className = '', format, defaultValue, value, onChange, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  const [internalValue, setInternalValue] = React.useState(
    value !== undefined ? value : defaultValue || ''
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const formatValue = (value: string, formatPattern: string) => {
    const clean = value.replace(/[^0-9a-zA-Z]/g, '');
    let output = '';
    let cleanIndex = 0;

    for (let i = 0; i < formatPattern.length; i++) {
        if (cleanIndex >= clean.length) break;

        const char = formatPattern[i];
        
        if (char === 'N') {
            while (cleanIndex < clean.length) {
                const c = clean[cleanIndex];
                if (/\d/.test(c)) {
                    output += c;
                    cleanIndex++;
                    break;
                }
                cleanIndex++;
            }
        } else if (char === 'L') {
            while (cleanIndex < clean.length) {
                const c = clean[cleanIndex];
                if (/[a-zA-Z]/.test(c)) {
                    output += c;
                    cleanIndex++;
                    break;
                }
                cleanIndex++;
            }
        } else if (char === 'A') {
             if (cleanIndex < clean.length) {
                output += clean[cleanIndex];
                cleanIndex++;
             }
        } else {
            // Only add separator if we have more characters to display
            if (cleanIndex < clean.length) {
                 output += char;
            }
        }
    }
    return output;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (format) {
        newValue = formatValue(newValue, format);
        // We set the input value directly to maintain cursor position/behavior where possible, 
        // though for controlled inputs React handles this via re-render.
    }
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue, e);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-[3px] mb-[5px]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          className={`flex w-full border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all h-10 px-4 text-base rounded-md ${isPassword && !showPassword ? 'font-bold tracking-widest text-lg' : ''} ${className}`}
          onChange={handleChange}
          value={internalValue}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1 pl-[3px]">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
