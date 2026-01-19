import React from 'react';
import { Tooltip } from './Tooltip';

interface TextEllipsisProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  width?: string | number;
  lines?: number;
  tooltip?: boolean; // Show tooltip on hover
  className?: string; // Additional classes
}

export const TextEllipsis = React.forwardRef<HTMLDivElement, TextEllipsisProps>(({ 
  text, 
  width = '100%', 
  lines = 1, 
  tooltip = true, 
  className = '', 
  ...props 
}, ref) => {
    const isMultiLine = lines > 1;

    const style: React.CSSProperties = {
        maxWidth: width,
        // Single line ellipsis
        ...(!isMultiLine && {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block'
        }),
        // Multi-line ellipsis
        ...(isMultiLine && {
            display: '-webkit-box',
            WebkitLineClamp: lines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        }),
    };

    const content = (
         <div 
            ref={ref}
            className={`text-foreground ${className}`} 
            style={style} 
            {...props}
         >
            {text}
        </div>
    );

    if (tooltip) {
        return (
            <Tooltip 
                content={<div className="max-w-xs whitespace-normal break-words">{text}</div>}
                className="max-w-full"
            >
                {content}
            </Tooltip>
        );
    }

    return content;
});

TextEllipsis.displayName = "TextEllipsis";
