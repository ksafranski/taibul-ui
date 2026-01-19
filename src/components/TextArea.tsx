"use client";

import React, { useState, useEffect } from 'react';

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  error?: string;
  maxCharacters?: number;
  resizable?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  [key: string]: any;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ 
  label, 
  error, 
  required, 
  className = '', 
  maxCharacters, 
  resizable = true,
  onChange,
  value,
  defaultValue,
  maxLength,
  hint,
  ...props 
}, ref) => {
  const [internalValue, setInternalValue] = useState<string | number | readonly string[] | undefined>(
    value !== undefined ? value : defaultValue
  );
  
  const [currentLength, setCurrentLength] = useState(0);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Sync length w/ external value changes
  useEffect(() => {
    if (typeof internalValue === 'string') {
      setCurrentLength(internalValue.length);
    } else if (typeof internalValue === 'number') {
      setCurrentLength(internalValue.toString().length);
    } else {
        setCurrentLength(0);
    }
  }, [internalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setCurrentLength(newVal.length);
    
    if (value === undefined) {
        setInternalValue(newVal);
    }
    
    onChange?.(newVal, e);
  };

  const effectiveMaxLength = maxCharacters || maxLength;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-end">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-[3px] mb-[5px]">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {maxCharacters && (
          <span className={`text-xs mb-[5px] pr-[3px] ${currentLength > maxCharacters ? 'text-red-500 font-semibold' : 'text-muted-foreground'}`}>
            {currentLength}/{maxCharacters}
          </span>
        )}
      </div>
      
      <textarea
        ref={ref}
        className={`flex min-h-[80px] w-full rounded-lg border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${
          !resizable ? 'resize-none' : ''
        } ${className}`}
        onChange={handleChange}
        value={internalValue}
        maxLength={effectiveMaxLength}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 pl-[3px]">{error}</p>}
    </div>
  );
});

TextArea.displayName = "TextArea";
