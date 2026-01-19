"use client";

import React, { useState } from 'react';
import { Code, ChevronUp } from 'lucide-react';
import { SyntaxHighlighter } from './SyntaxHighlighter';
import { CopyToClipboard } from './CopyToClipboard';
import { Button } from './Button';

interface CodeRevealProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export const CodeReveal = React.forwardRef<HTMLDivElement, CodeRevealProps & React.HTMLAttributes<HTMLDivElement>>(({ 
  code, 
  language = 'tsx', 
  title = 'Example Code', 
  className = '',
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div ref={ref} className={`w-full mt-6 ${className}`} {...props}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-4 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all flex items-center justify-center gap-2 group cursor-pointer bg-muted/5 hover:bg-muted/10 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Code size={16} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-sm">Show Code</span>
        </button>
      ) : (
        <div className="w-full border border-border rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 shadow-sm">
           <div 
             className="bg-muted/50 px-4 py-2 border-b border-border flex items-center justify-between"
           >
              <div className="flex items-center gap-2">
                 <Code size={14} className="text-muted-foreground" />
                 <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center pr-2 border-r border-border/50">
                    <CopyToClipboard text={code} />
                </div>
                <Button 
                   variant="ghost" 
                   size="sm" 
                   className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                   onClick={() => setIsOpen(false)}
                >
                  Hide
                  <ChevronUp size={14} className="ml-1" />
                </Button>
              </div>
           </div>
           <div>
             <SyntaxHighlighter language={language} code={code} className="rounded-t-none" />
           </div>
        </div>
      )}
    </div>
  );
});

CodeReveal.displayName = "CodeReveal";
