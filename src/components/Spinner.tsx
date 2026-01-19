"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
  variant?: 'primary' | 'muted' | 'white';
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({ 
  size = 'md', 
  className = '', 
  variant = 'primary',
  ...props
}, ref) => {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const finalSize = typeof size === 'number' ? size : sizeMap[size];

  const variants = {
    primary: 'text-primary',
    muted: 'text-muted-foreground',
    white: 'text-white',
  };

  return (
    <div ref={ref} role="status" className={`inline-flex items-center justify-center ${className}`} {...props}>
      <Loader2 
        size={finalSize} 
        className={`animate-spin ${variants[variant]}`} 
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
});

Spinner.displayName = "Spinner";
