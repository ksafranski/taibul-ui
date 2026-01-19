"use client";

import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ level = 1, children, className = '', ...props }, ref) => {
  const Tag = (`h${level}`) as React.ElementType;
  
  const styles = {
    1: 'text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 pb-2',
    2: 'text-3xl font-semibold tracking-tight border-b border-border/40 pb-4 mb-8',
    3: 'text-2xl font-semibold tracking-tight mb-6',
    4: 'text-xl font-semibold tracking-tight mb-6',
    5: 'text-lg font-semibold tracking-tight mb-6',
    6: 'text-base font-semibold tracking-tight mb-6',
  };

  return <Tag ref={ref} className={`scroll-m-20 ${styles[level]} ${className}`} {...props}>{children}</Tag>;
});

Heading.displayName = "Heading";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: 'p' | 'lead' | 'large' | 'small' | 'muted';
  className?: string;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(({ children, variant = 'p', className = '', ...props }, ref) => {
  const styles = {
    p: 'text-lg leading-7 [&:not(:first-child)]:mt-6',
    lead: 'text-xl text-muted-foreground',
    large: 'text-lg font-semibold',
    small: 'text-sm font-medium leading-none',
    muted: 'text-sm text-muted-foreground',
  };

  return <p ref={ref} className={`${styles[variant]} ${className}`} {...props}>{children}</p>;
});

Text.displayName = "Text";
