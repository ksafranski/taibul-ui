"use client";

import React, { useRef, useState, useEffect } from 'react';

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number], e?: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  showValue?: boolean;
  unit?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  className = '',
  showValue = true,
  unit = '',
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState<number | [number, number]>(
    value !== undefined ? value : defaultValue !== undefined ? defaultValue : 0
  );
  
  const isRange = Array.isArray(internalValue);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setInternalValue(newValue);
    onChange?.(newValue, e);
  };

  const handleRangeChange = (index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRange) return;
    const newValue = parseFloat(e.target.value);
    const newRange: [number, number] = [...internalValue];
    
    if (index === 0) {
      newRange[0] = Math.min(newValue, newRange[1]);
    } else {
      newRange[1] = Math.max(newValue, newRange[0]);
    }
    
    setInternalValue(newRange);
    onChange?.(newRange, e);
  };

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  return (
    <div ref={ref} className={`flex flex-col gap-2 w-full ${className}`} {...props}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-sm font-medium leading-none pl-[3px]">
            {label}
          </label>
        )}
        {showValue && (
          <span className="text-xs font-medium text-muted-foreground tabular-nums">
            {isRange ? `${internalValue[0]}${unit} — ${internalValue[1]}${unit}` : `${internalValue}${unit}`}
          </span>
        )}
      </div>

      <div className="relative h-6 flex items-center group" ref={trackRef}>
        {/* Track Background */}
        <div className="absolute w-full h-1.5 bg-secondary rounded-full" />
        
        {/* Active Track Highlight */}
        <div 
          className="absolute h-1.5 bg-primary rounded-full"
          style={{
            left: `${isRange ? getPercentage(internalValue[0]) : 0}%`,
            right: `${isRange ? 100 - getPercentage(internalValue[1]) : 100 - getPercentage(internalValue as number)}%`
          }}
        />

        {isRange ? (
          <>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={internalValue[0]}
              onChange={handleRangeChange(0)}
              className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none cursor-pointer z-10 
              [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-110
              [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:active:scale-110"
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={internalValue[1]}
              onChange={handleRangeChange(1)}
              className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none cursor-pointer z-20
              [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-110
              [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:active:scale-110"
            />
          </>
        ) : (
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={internalValue as number}
            onChange={handleSingleChange}
            className="w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-110
            [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:active:scale-110"
          />
        )}
      </div>
    </div>
  );
});

Slider.displayName = "Slider";
