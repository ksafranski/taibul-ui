"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const TabsRoot = React.forwardRef<HTMLDivElement, TabsProps>(({ defaultValue, value, onValueChange, children, className = "", ...props }, ref) => {
  const [activeTab, setActiveTabState] = useState(value || defaultValue || "");

  useEffect(() => {
    if (value !== undefined) {
      setActiveTabState(value);
    }
  }, [value]);

  const setActiveTab = (newValue: string) => {
    if (value === undefined) {
      setActiveTabState(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div ref={ref} className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

TabsRoot.displayName = "Tabs";

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ children, className = "", ...props }, ref) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsList must be used within Tabs");
  const { activeTab } = context;

  const localRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Merge refs
  React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

  useEffect(() => {
    const list = localRef.current;
    if (!list) return;

    const activeTrigger = list.querySelector(`[data-state="active"]`) as HTMLElement;
    
    if (activeTrigger) {
      setIndicatorStyle({
        left: activeTrigger.offsetLeft,
        width: activeTrigger.offsetWidth,
        opacity: 1
      });
    }
  }, [activeTab]);

  return (
    <div ref={localRef} className={`relative flex border-b border-border mb-4 ${className}`} {...props}>
      {children}
      <div 
        className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity
        }}
      />
    </div>
  );
});

TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(({ 
  value, 
  children, 
  icon: Icon, 
  iconPosition = 'left', 
  className = "",
  disabled = false,
  onClick,
  ...props
}, ref) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(value);
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      data-state={isActive ? "active" : "inactive"}
      data-value={value}
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer
        flex items-center gap-2 -mb-px border-b-2 border-transparent
        ${isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={16} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={16} />}
    </button>
  );
});

TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ value, children, className = "", ...props }, ref) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  const { activeTab } = context;
  if (activeTab !== value) return null;

  return (
    <div ref={ref} className={`animate-in fade-in slide-in-from-bottom-1 duration-200 ${className}`} {...props}>
      {children}
    </div>
  );
});

TabsContent.displayName = "TabsContent";

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent
}) as React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
};

export { Tabs };
