"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Icon as IconComponent, IconName } from './Icon';
import { Tooltip } from './Tooltip';

// Simple utility to merge classes if no utility exists
const cn = (...inputs: (string | undefined | null | false)[]) => inputs.filter(Boolean).join(' ');

export type NavigationItem = 
  | { header: string }
  | { divider: true }
  | { 
      label: string; 
      icon?: LucideIcon; 
      iconName?: IconName;
      iconColor?: string; 
      href?: string; 
      onClick?: () => void; 
      isActive?: boolean; 
      id?: string;
    };

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavigationItem[];
  collapsed?: boolean;
  className?: string;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(({ items, collapsed = false, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-1 px-3", collapsed && "pt-2", className)} {...props}>
      {items.map((item, index) => {
        // Return Spacer/Divider
        if ('divider' in item) {
          return <div key={index} className="my-4 border-t border-border mx-2" />;
        }

        // Header Item
        if ('header' in item) {
          if (collapsed) return null; // No spacer when collapsed
          return (
             <div key={index} className="px-3 py-2 mt-4 first:mt-0">
               <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                 {item.header}
               </span>
             </div>
          );
        }
        
        // Link Item
        const Icon = item.icon;
        
        const content = (
          <div className={cn(
            "flex items-center rounded-md transition-colors py-2 group min-h-[36px]",
            collapsed ? "justify-center px-0" : "px-3 gap-3",
            item.isActive ? "bg-secondary text-secondary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}>
            {(item.iconName || Icon) && (
              <IconComponent 
                name={item.iconName}
                customIcon={Icon}
                size={20} 
                className={cn(
                  "shrink-0", 
                  item.iconColor,
                  item.isActive && "text-primary"
                )} 
                aria-hidden="true"
              />
            )}
            
            <span className={cn(
              "truncate transition-all duration-300",
              collapsed ? "w-0 opacity-0 overflow-hidden absolute" : "w-auto opacity-100 relative"
            )}>
              {item.label}
            </span>
          </div>
        );

        const itemElement = item.href ? (
          <a 
            href={item.href} 
            onClick={item.onClick}
            className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-md"
          >
            {content}
          </a>
        ) : (
          <button 
            onClick={item.onClick}
            className="w-full text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-md"
          >
            {content}
          </button>
        );

        if (collapsed) {
          return (
            <Tooltip key={index} content={item.label} position="right" className="w-full block">
              {itemElement}
            </Tooltip>
          );
        }

        return (
          <React.Fragment key={index}>
            {itemElement}
          </React.Fragment>
        );
      })}
    </div>
  );
});

Menu.displayName = "Menu";
