"use client";

import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  className?: string;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ 
  value, 
  max = 100, 
  className = '', 
  variant = 'primary',
  size = 'md',
  showValue = false,
  ...props
}, ref) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  const variants = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-orange-500',
    error: 'bg-red-500',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div ref={ref} className={`w-full ${className}`} {...props}>
      <div className="flex items-center justify-between mb-2">
        {showValue && (
          <span className="text-xs font-medium text-muted-foreground ml-auto">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className={`w-full bg-accent dark:bg-secondary rounded-full overflow-hidden ${sizes[size]}`}>
        <div 
          className={`h-full w-full flex-1 transition-transform duration-500 ease-out ${variants[variant]}`}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
});

Progress.displayName = "Progress";
