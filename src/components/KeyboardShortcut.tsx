import React from 'react';

interface KeyboardShortcutProps extends React.HTMLAttributes<HTMLDivElement> {
    keys: string[];
    className?: string;
}

export const KeyboardShortcut = React.forwardRef<HTMLDivElement, KeyboardShortcutProps>(({ keys, className = '', ...props }, ref) => {
    return (
        <div ref={ref} className={`flex items-center gap-1 ${className}`} {...props}>
            {keys.map((k, i) => (
                <kbd 
                    key={i} 
                    className="
                        pointer-events-none 
                        inline-flex 
                        h-5 
                        select-none 
                        items-center 
                        gap-1 
                        rounded 
                        border 
                        bg-muted/50 
                        px-1.5 
                        font-[system-ui] 
                        text-[10px] 
                        font-medium 
                        text-muted-foreground
                        shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)]
                        dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]
                        active:shadow-none
                        active:translate-y-[2px]
                    "
                >
                    <span className={`uppercase ${k === '⌘' ? 'text-sm' : 'text-xs'}`}>{k}</span>
                </kbd>
            ))}
        </div>
    )
});

KeyboardShortcut.displayName = "KeyboardShortcut";
