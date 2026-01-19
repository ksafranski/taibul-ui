import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string; // Class for the wrapper div
  contentClassName?: string; // Class for the tooltip content
  delay?: number;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({ 
  content, 
  position = 'top', 
  children, 
  className = '',
  contentClassName = '',
  delay = 200,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  
  const triggerRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => triggerRef.current as HTMLDivElement);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
      setShouldRender(true);
    } else {
      exitTimeoutRef.current = setTimeout(() => {
        setShouldRender(false);
      }, 150);
    }
  }, [isVisible]);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    
    const rect = triggerRef.current.getBoundingClientRect();

    // Base coordinates + adjustments
    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = rect.top - 8; // standard gap
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + 8;
        left = rect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - 8;
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + 8;
        break;
    }

    setCoords({ top, left });
  };

  const showTooltip = () => {
    updatePosition();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Re-calculate in case of layout shifts just before showing
      updatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  // Helper styles for the portal content
  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${coords.top}px`,
    left: `${coords.left}px`,
    // We use transforms to center/offset effectively based on the calculated anchor point
    transform: 
      position === 'top' ? 'translate(-50%, -100%)' :
      position === 'bottom' ? 'translate(-50%, 0)' :
      position === 'left' ? 'translate(-100%, -50%)' :
      'translate(0, -50%)', // right
    zIndex: 9999,
  };
  
  const animationClass = isVisible 
    ? 'animate-in fade-in zoom-in-95 duration-150' 
    : 'animate-out fade-out zoom-out-95 duration-150';

  return (
    <div 
      ref={triggerRef}
      className={className || "relative inline-flex w-fit"} // User can override full class
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      {...props}
    >
      {children}
      {mounted && shouldRender && createPortal(
        <div 
          style={tooltipStyle} 
          className="pointer-events-none" 
        >
          <div
            role="tooltip"
            className={`
              relative
              px-3 py-1.5 text-sm font-semibold text-secondary-foreground bg-secondary rounded-md shadow-lg whitespace-nowrap 
              origin-center
              ${animationClass}
              ${contentClassName}
            `}
          >
            {content}
            <div 
              className={`
                absolute w-2 h-2 bg-secondary rotate-45
                ${
                  position === 'top' ? '-bottom-1 left-1/2 -translate-x-1/2' :
                  position === 'bottom' ? '-top-1 left-1/2 -translate-x-1/2' :
                  position === 'left' ? '-right-1 top-1/2 -translate-y-1/2' :
                  '-left-1 top-1/2 -translate-y-1/2'
                }
              `}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
});

Tooltip.displayName = "Tooltip";
