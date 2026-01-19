"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Input } from './Input';

import { Check } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
  label?: string;
}

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', 
  '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#0f172a',
  '#ffffff', '#f3f4f6', '#9ca3af', '#4b5563', '#1f2937', '#000000'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  value, 
  onChange, 
  className = '',
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset input to actual value on close if invalid or not committed
        setInputValue(value); 
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, value]);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      onChange(val);
    }
  };

  const handleBlur = () => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
      setInputValue(value); // Revert if invalid
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 relative ${className}`} ref={containerRef}>
      {label && <label className="text-sm font-medium leading-none pl-[3px] mb-[5px]">{label}</label>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 border border-input rounded-lg hover:bg-muted/50 transition-colors w-full h-12 bg-background"
      >
        <div 
          className="w-8 h-8 rounded-md border border-border shadow-sm flex-shrink-0" 
          style={{ backgroundColor: value }}
        />
        <span className="text-sm font-mono text-muted-foreground uppercase flex-1 text-left">
          {value}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full mt-2 left-0 w-64 p-4 bg-background border border-border rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200">
           
           {/* Hex Input */}
           <div className="mb-4">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-md border border-border flex-shrink-0" style={{ backgroundColor: inputValue }} />
               <Input 
                 value={inputValue} 
                 onChange={(val: string) => handleInputChange(val)}
                 onBlur={handleBlur}
                 className="h-8 font-mono text-xs uppercase"
                 placeholder="#000000"
                 maxLength={7}
               />
             </div>
           </div>

           {/* Presets */}
           <div className="grid grid-cols-6 gap-2">
             {PRESET_COLORS.map((color) => (
               <button
                 key={color}
                 onClick={() => {
                   onChange(color);
                   setInputValue(color);
                 }}
                 className="w-8 h-8 rounded-full border border-border hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 relative flex items-center justify-center"
                 style={{ backgroundColor: color }}
                 title={color}
               >
                 {value.toLowerCase() === color.toLowerCase() && (
                   <Check size={14} className={getContrastYIQ(color) === 'black' ? 'text-black' : 'text-white'} />
                 )}
               </button>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

// Helper for checkmark contrast
function getContrastYIQ(hexcolor: string){
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}
