"use client";

import React from 'react';
import { LucideIcon, X } from 'lucide-react';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 
    | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
    | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'gray';
  size?: 'sm' | 'md';
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onClose?: (e: React.MouseEvent) => void;
  className?: string;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(({
  children,
  variant = 'secondary',
  size = 'md',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClose,
  className = '',
  ...props
}, ref) => {
  const variants = {
    // Semantic
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary text-secondary-foreground border-border',
    success: 'bg-green-500/10 text-green-600 border-green-500/20',
    warning: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    error: 'bg-red-500/10 text-red-600 border-red-500/20',
    outline: 'bg-transparent text-foreground border-border',
    
    // Custom Colors
    blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    red: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    yellow: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    pink: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    gray: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
  };

  return (
    <span
      ref={ref}
      className={`inline-flex items-center font-medium rounded-md border transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {LeftIcon && <LeftIcon size={iconSizes[size]} />}
      {children}
      {RightIcon && <RightIcon size={iconSizes[size]} />}
      {onClose && (
        <button
          onClick={onClose}
          className="hover:bg-foreground/10 rounded-full p-0.5 transition-colors cursor-pointer ml-0.5"
          aria-label="Remove tag"
        >
          <X size={iconSizes[size]} />
        </button>
      )}
    </span>
  );
});

Tag.displayName = "Tag";
