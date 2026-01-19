"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Icon as IconComponent } from './Icon';
import { Tooltip } from './Tooltip';
import { NavigationItem } from './Menu';

// Simple utility to merge classes if no utility exists
const cn = (...inputs: (string | undefined | null | false)[]) => inputs.filter(Boolean).join(' ');

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  collapsed?: boolean;
  collapsedWidth?: string;
  navigation?: NavigationItem[];
  onCollapse?: (collapsed: boolean) => void;
}

const LayoutMain = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("flex flex-col min-h-0 w-full bg-background text-foreground", className)} 
        {...props}
      >
        {children}
      </div>
    );
  }
);
LayoutMain.displayName = "Layout";

const Header = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className = '', ...props }, ref) => (
    <header 
      ref={ref} 
      className={cn("flex-none h-16 flex items-center px-6 border-b border-border bg-card", className)} 
      {...props}
    >
      {children}
    </header>
  )
);
Header.displayName = "Layout.Header";

const Footer = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className = '', ...props }, ref) => (
    <footer 
      ref={ref} 
      className={cn("flex-none py-6 px-6 border-t border-border bg-card", className)} 
      {...props}
    >
      {children}
    </footer>
  )
);
Footer.displayName = "Layout.Footer";

const Sider = React.forwardRef<HTMLDivElement, SiderProps>(
  ({ children, className = '', width = 'w-64', collapsed = false, collapsedWidth = 'w-16', style, navigation, onCollapse, ...props }, ref) => {
    const isTailwindWidth = width.startsWith('w-');
    const isTailwindCollapsedWidth = collapsedWidth.startsWith('w-');
    
    const finalWidthClass = collapsed ? (isTailwindCollapsedWidth ? collapsedWidth : '') : (isTailwindWidth ? width : '');
    
    const finalStyle = {
      ...style,
      width: !isTailwindWidth && !collapsed ? width : (!isTailwindCollapsedWidth && collapsed ? collapsedWidth : undefined)
    };

    return (
      <aside 
        ref={ref} 
        className={cn(
          "flex-none border-r border-border bg-card flex flex-col transition-all duration-300 ease-in-out", 
          finalWidthClass,
          collapsed && "overflow-hidden",
          className
        )} 
        style={finalStyle}
        {...props}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          {navigation && (
            <div className="space-y-1 px-3">
              {navigation.map((item, index) => {
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
                    item.isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
          )}
          {children}
        </div>
        
        {onCollapse && (
          <button 
            onClick={() => onCollapse(!collapsed)}
            className="flex flex-none items-center justify-center h-9 w-full border-t border-border/50 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer mt-auto"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight size={16} /> 
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        )}
      </aside>
    );
  }
);
Sider.displayName = "Layout.Sider";

const Content = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className = '', ...props }, ref) => (
    <main 
      ref={ref} 
      className={cn("flex-1 overflow-y-auto p-6", className)} 
      {...props}
    >
      {children}
    </main>
  )
);
Content.displayName = "Layout.Content";

export const Layout = Object.assign(LayoutMain, {
  Header,
  Footer,
  Sider,
  Content,
});
