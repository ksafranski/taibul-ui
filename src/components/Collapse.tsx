import React, { useState, createContext, useContext } from 'react';
import { ChevronRight } from 'lucide-react';

interface CollapseProps {
  accordion?: boolean;
  defaultActiveKey?: string | string[];
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}

interface CollapseContextType {
  activeKeys: string[];
  toggleKey: (key: string) => void;
  accordion?: boolean;
}

const CollapseContext = createContext<CollapseContextType | undefined>(undefined);

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps & React.HTMLAttributes<HTMLDivElement>>(({
  accordion = false,
  defaultActiveKey,
  children,
  className = '',
  bordered = true,
  ...props
}, ref) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(() => {
    if (defaultActiveKey === undefined) return [];
    return Array.isArray(defaultActiveKey) ? defaultActiveKey : [defaultActiveKey];
  });

  const toggleKey = (key: string) => {
    setActiveKeys((prevTags) => {
      if (accordion) {
        return prevTags.includes(key) ? [] : [key];
      }
      return prevTags.includes(key)
        ? prevTags.filter((k) => k !== key)
        : [...prevTags, key];
    });
  };

  return (
    <CollapseContext.Provider value={{ activeKeys, toggleKey, accordion }}>
      <div ref={ref} className={`
        rounded-lg 
        ${bordered ? 'border border-border' : ''} 
        bg-card 
        ${className}
      `} {...props}>
        {children}
      </div>
    </CollapseContext.Provider>
  );
});

Collapse.displayName = "Collapse";

interface PanelProps {
  id: string; // key is reserved in React
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Panel = ({ id, header, children, className = '', disabled = false }: PanelProps) => {
  const context = useContext(CollapseContext);
  
  if (!context) {
    throw new Error('Collapse.Panel must be used within a Collapse component');
  }

  const { activeKeys, toggleKey } = context;
  const isActive = activeKeys.includes(id);

  const handleToggle = () => {
    if (!disabled) {
      toggleKey(id);
    }
  };

  return (
    <div className={`
        border-b border-border last:border-b-0
        transition-colors
        ${className}
    `}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          flex items-center justify-between w-full p-4 text-left
          font-medium text-foreground 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/30 cursor-pointer'}
        `}
      >
        <span className="flex-1">{header}</span>
        <span className={`
            text-muted-foreground transition-transform duration-200 ml-4
            ${isActive ? 'rotate-90' : ''}
        `}>
          <ChevronRight size={16} />
        </span>
      </button>
      
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-4 pt-2 text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};

const CollapseCompound = Object.assign(Collapse, {
  Panel
}) as React.ForwardRefExoticComponent<CollapseProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> & {
  Panel: typeof Panel;
};

export { CollapseCompound as Collapse };
