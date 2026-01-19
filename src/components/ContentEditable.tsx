
import React, { useRef, useEffect } from 'react';

interface ContentEditableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const ContentEditable = React.forwardRef<HTMLDivElement, ContentEditableProps>(({
  value,
  onChange,
  className,
  placeholder,
  disabled,
  ...props
}, ref) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  
  React.useImperativeHandle(ref, () => contentEditableRef.current as HTMLDivElement);

  // Sync ref with value only if they differ significantly (avoids caret jumping)
  useEffect(() => {
    if (contentEditableRef.current && contentEditableRef.current.innerText !== value) {
      contentEditableRef.current.innerText = value;
    }
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerText;
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={contentEditableRef}
      contentEditable={!disabled}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning
      className={`inline-flex w-full items-center text-lg leading-relaxed ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground cursor-text ${className || ''}`}
      data-placeholder={placeholder}
      {...props}
    />
  );
});

ContentEditable.displayName = "ContentEditable";
