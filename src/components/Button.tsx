"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = "primary",
  size = "md",
  className = "",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  isLoading = false,
  disabled,
  ...props
}, ref) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer gap-2";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline:
      "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-sm",
    md: "h-10 px-4 py-2 rounded-md",
    lg: "h-12 px-4 text-base rounded-lg",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 20,
  };

  const spinnerSize = size === 'lg' ? 'md' : 'sm';

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner size={spinnerSize} variant={variant === 'primary' ? 'white' : 'primary'} />
      ) : (
        LeftIcon && <LeftIcon size={iconSizes[size]} />
      )}
      {children}
      {!isLoading && RightIcon && <RightIcon size={iconSizes[size]} />}
    </button>
  );
});

Button.displayName = "Button";
