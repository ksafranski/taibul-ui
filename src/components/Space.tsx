"use client";

import React from 'react';

// Simple utility to merge classes
const cn = (...inputs: (string | undefined | null | false)[]) => inputs.filter(Boolean).join(' ');

interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

const Space = React.forwardRef<HTMLDivElement, SpaceProps>(({
  children,
  className,
  gap = 8,
  direction = 'horizontal',
  align,
  justify,
  wrap = false,
  style,
  ...props
}, ref) => {
  
  const alignClass = align ? `items-${align}` : '';
  const justifyClass = justify ? `justify-${justify}` : '';

  return (
    <div
      ref={ref}
      className={cn(
        "flex",
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        wrap && 'flex-wrap',
        alignClass,
        justifyClass,
        className
      )}
      style={{
        gap: `${gap}px`,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Space.displayName = "Space";

export { Space };
