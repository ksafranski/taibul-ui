"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Tag } from './Tag';

interface Option {
  label: string;
  value: string;
}

interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: Option[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[], e?: React.SyntheticEvent) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  required?: boolean;
  multi?: boolean;
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(({ 
  options, 
  value, 
  defaultValue,
  onChange, 
  label, 
  placeholder = "Select option...", 
  error,
  className = "",
  required,
  multi = false,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with value if present, otherwise defaultValue
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(
    value !== undefined ? value : defaultValue
  );

  // Sync internal value with controlled value prop if it changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const updateValue = (newValue: string | string[], e?: React.SyntheticEvent) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue, e);
  };

  const selectedOptions = useMemo(() => {
    if (multi && Array.isArray(internalValue)) {
      return options.filter(opt => internalValue.includes(opt.value));
    }
    if (!multi && typeof internalValue === 'string') {
      const opt = options.find(opt => opt.value === internalValue);
      return opt ? [opt] : [];
    }
    return [];
  }, [options, internalValue, multi]);

  const filteredOptions = useMemo(() => {
    // Show all options if search term is empty OR matches the current selection exactly
    if (!multi && selectedOptions.length > 0) {
      if (!searchTerm || searchTerm === selectedOptions[0].label) {
        return options;
      }
    }
    
    if (multi && !searchTerm) {
      return options;
    }

    // Filter by search term
    return options.filter(opt => 
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, selectedOptions, multi]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option, e?: React.SyntheticEvent) => {
    if (multi) {
      const currentValues = Array.isArray(internalValue) ? internalValue : [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];
      updateValue(newValues, e);
      setSearchTerm("");
      // Keep menu open for multi-select
      inputRef.current?.focus();
    } else {
      updateValue(option.value, e);
      setSearchTerm("");
      setIsOpen(false);
      setIsFocused(false);
      setSelectedIndex(-1);
    }
  };

  const handleRemove = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    if (multi && Array.isArray(internalValue)) {
      updateValue(internalValue.filter(v => v !== optionValue), e);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
    if (!multi) {
      setSearchTerm(selectedOptions[0]?.label || "");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        handleFocus();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
          handleSelect(filteredOptions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setIsFocused(false);
        break;
      case 'Tab':
        setIsOpen(false);
        setIsFocused(false);
        break;
      case 'Backspace':
        if (multi && searchTerm === "" && Array.isArray(internalValue) && internalValue.length > 0) {
          // Remove last tag if search is empty
          updateValue(internalValue.slice(0, -1));
        }
        break;
    }
  };

  const displayValue = isFocused ? searchTerm : (multi ? "" : (selectedOptions[0]?.label || ""));
  const isSelected = (optionValue: string) => {
    if (multi && Array.isArray(internalValue)) return internalValue.includes(optionValue);
    return internalValue === optionValue;
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
        <div 
          className={`flex w-full border border-input bg-background ring-offset-background min-h-12 px-3 py-1.5 items-center flex-wrap gap-2 rounded-lg cursor-text transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${error ? 'border-red-500' : ''}`}
          onClick={() => {
            handleFocus();
            inputRef.current?.focus();
          }}
        >
          {multi && selectedOptions.map(option => (
            <Tag 
              key={option.value} 
              variant="primary" 
              onClose={(e) => handleRemove(e, option.value)}
              size="sm"
            >
              {option.label}
            </Tag>
          ))}
          
          <input
            ref={inputRef}
            type="text"
            className={`flex-1 bg-transparent border-none outline-none min-w-[80px] text-base placeholder:text-muted-foreground/30 ${!isFocused && !multi && selectedOptions.length > 0 ? 'text-foreground' : ''}`}
            placeholder={isFocused || (multi && selectedOptions.length > 0) ? "" : placeholder}
            value={displayValue}
            onChange={(e) => {
              const val = e.target.value;
              setSearchTerm(val);
              if (!isOpen) setIsOpen(true);
              setSelectedIndex(0);
              
              if (!multi && val === "" && internalValue !== "") {
                updateValue("");
              }
            }}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
          <ChevronDown 
            size={18} 
            className={`text-muted-foreground transition-transform duration-200 ml-auto ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-background border border-border rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-60 overflow-y-auto p-1 text-foreground">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className={`flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${
                      selectedIndex === index 
                        ? 'bg-accent text-accent-foreground' 
                        : isSelected(option.value) 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-accent/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option, e);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span>{option.label}</span>
                    {isSelected(option.value) && <Check size={16} />}
                  </div>
                ))
              ) : (
                <div className="px-3 py-4 text-sm text-center text-muted-foreground italic">
                  No options found...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="text-xs text-red-500 mt-1 pl-[3px]">{error}</p>}
    </div>
  );
});
