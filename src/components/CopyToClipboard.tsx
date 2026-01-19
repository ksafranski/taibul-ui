"use client";

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Tooltip } from './Tooltip';


interface CopyToClipboardProps extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> {
  text: string;
  duration?: number;
  children?: React.ReactNode;
  showTooltip?: boolean;
}

export const CopyToClipboard = React.forwardRef<HTMLDivElement | HTMLButtonElement, CopyToClipboardProps>(({ 
  text, 
  duration = 2000, 
  children,
  showTooltip = true,
  ...props
}, ref) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  if (children) {
    const content = (
      <div 
        ref={ref as React.Ref<HTMLDivElement>}
        onClick={handleCopy} 
        className="cursor-pointer inline-flex items-center gap-2 transition-opacity hover:opacity-80 active:scale-95 duration-200"
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
        {copied && <Check className="h-3.5 w-3.5 text-green-500 animate-in zoom-in spin-in-45 duration-300" />}
      </div>
    );

    if (showTooltip) {
      return (
        <Tooltip content={copied ? 'Copied!' : 'Click to copy'}>
          {content}
        </Tooltip>
      );
    }
    return content;
  }

  // Default button variant
  return (
    <Tooltip content={copied ? 'Copied!' : 'Copy to clipboard'}>
      <button
        type="button"
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={handleCopy}
        className="relative h-5 w-5 cursor-pointer focus:outline-none transition-transform active:scale-95"
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        <Copy 
          className={`absolute inset-0 w-full h-full transition-all duration-300 text-muted-foreground ${
            copied ? 'scale-0 opacity-0' : 'scale-100 opacity-75 hover:opacity-100'
          }`} 
        />
        <Check 
          className={`absolute inset-0 w-full h-full transition-all duration-300 text-green-500 ${
            copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0 rotate-90'
          }`} 
        />
      </button>
    </Tooltip>
  );
});

CopyToClipboard.displayName = "CopyToClipboard";
