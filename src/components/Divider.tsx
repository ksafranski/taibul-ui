"use client";

import React from 'react';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style of the divider line.
   * @default 'solid'
   */
  variant?: 'solid' | 'dashed' | 'dotted';
  /**
   * The orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Optional text to display in the middle of a horizontal divider.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(({
  variant = 'solid',
  orientation = 'horizontal',
  children,
  className = '',
  ...props
}, ref) => {
  const borderStyles = {
    solid: 'border-solid',
    dashed: 'border-dashed', // removed opacity-80
    dotted: 'border-dotted', // removed opacity-80
  };

  // Removed opacity (was /60) to make dividers crisper and less dim
  const baseStyles = "border-border";

  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        className={`inline-block h-auto self-stretch min-h-[1em] w-0 border-r ${baseStyles} ${borderStyles[variant]} mx-4 ${className}`}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (children) {
    return (
      <div ref={ref} className={`flex items-center w-full my-8 ${className}`} role="separator" aria-orientation="horizontal" {...props}>
        <div className={`flex-grow border-t ${baseStyles} ${borderStyles[variant]}`} />
        <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 whitespace-nowrap">
          {children}
        </span>
        <div className={`flex-grow border-t ${baseStyles} ${borderStyles[variant]}`} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`w-full border-t ${baseStyles} ${borderStyles[variant]} my-8 ${className}`}
      {...props}
      role="separator"
      aria-orientation="horizontal"
    />
  );
});

Divider.displayName = "Divider";
