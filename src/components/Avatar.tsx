"use client";

import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  /** The image source URL */
  src?: string;
  /** The name of the user, used for the initial if no image is provided */
  name?: string;
  /** The size of the avatar */
  size?: 'sm' | 'md' | 'lg';
  /** Alt text for the image */
  alt?: string;
  /** Custom class name */
  className?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({
  src,
  name,
  size = 'md',
  alt,
  className = '',
  ...props
}, ref) => {
  const [imageError, setImageError] = React.useState(false);

  // Size configurations
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 20,
  };

  // Derived state to determine what to render
  const shouldRenderImage = src && !imageError;
  const initial = name ? name.charAt(0).toUpperCase() : null;

  return (
    <div
      ref={ref}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 bg-muted border border-border/50 text-muted-foreground font-medium select-none ${sizes[size]} ${className}`}
      {...props}
    >
      {shouldRenderImage ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : initial ? (
        <span>{initial}</span>
      ) : (
        <User size={iconSizes[size]} />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";
