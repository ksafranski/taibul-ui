"use client";

import React, { useRef, useEffect } from 'react';

interface TimePickerProps {
  value?: string; // "HH:mm"
  onChange?: (value: string) => void;
  className?: string;
}

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(({ 
  value = "12:00", 
  onChange, 
  className = "",
  ...props
}, ref) => {
  const [hours24, minutesVal] = value.split(':').map(Number);
  
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  // 12-hour format logic
  const displayHour = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const period = hours24 < 12 ? 'AM' : 'PM';
  
  const hours12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ['AM', 'PM'];

  useEffect(() => {
    // Scroll Hours
    if (hourRef.current) {
      const hIndex = hours12.indexOf(displayHour);
      const hChild = hourRef.current.children[hIndex] as HTMLElement;
      if (hChild) {
        hourRef.current.scrollTop = hChild.offsetTop - hourRef.current.offsetTop - (hourRef.current.clientHeight / 2) + (hChild.clientHeight / 2);
      }
    }
    // Scroll Minutes
    if (minuteRef.current) {
      const mChild = minuteRef.current.children[minutesVal] as HTMLElement;
      if (mChild) {
        minuteRef.current.scrollTop = mChild.offsetTop - minuteRef.current.offsetTop - (minuteRef.current.clientHeight / 2) + (mChild.clientHeight / 2);
      }
    }
    // Scroll Period
    if (periodRef.current) {
      const pIndex = periods.indexOf(period);
      const pChild = periodRef.current.children[pIndex] as HTMLElement;
      if (pChild) {
        periodRef.current.scrollTop = pChild.offsetTop - periodRef.current.offsetTop - (periodRef.current.clientHeight / 2) + (pChild.clientHeight / 2);
      }
    }
  }, [displayHour, minutesVal, period]);

  const updateTime = (newHour12: number, newMin: number, newPeriod: string) => {
    let h24 = newHour12;
    if (newPeriod === 'PM' && newHour12 !== 12) h24 += 12;
    if (newPeriod === 'AM' && newHour12 === 12) h24 = 0;
    
    onChange?.(`${h24.toString().padStart(2, '0')}:${newMin.toString().padStart(2, '0')}`);
  };

  return (
    <div ref={ref} className={`p-4 bg-background border-t border-border flex flex-col gap-3 ${className}`} {...props}>
      <div className="flex justify-center items-center gap-1">
        <div className="flex-1 text-center text-[10px] uppercase font-bold text-muted-foreground mr-2">Hour</div>
        <div className="flex-1 text-center text-[10px] uppercase font-bold text-muted-foreground mr-6">Min</div>
        <div className="w-12 text-center text-[10px] uppercase font-bold text-muted-foreground"></div>
      </div>
      
      <div className="flex items-center justify-center gap-1 h-48 relative overflow-hidden">
        {/* Selection Highlight */}
        <div className="absolute left-0 right-0 h-11 top-1/2 -translate-y-1/2 bg-primary/10 rounded-lg pointer-events-none border-y border-primary/20" />
        
        {/* Top/Bottom Blends */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

        {/* Hours Column */}
        <div 
          ref={hourRef}
          className="flex-1 h-full overflow-y-auto no-scrollbar snap-y snap-mandatory scroll-smooth py-20"
        >
          {hours12.map((h) => (
            <button
              key={h}
              onClick={() => updateTime(h, minutesVal, period)}
              className={`
                w-full h-11 flex items-center justify-center text-sm font-medium transition-all snap-center cursor-pointer
                ${displayHour === h ? 'text-primary text-xl font-bold' : 'text-muted-foreground hover:text-foreground opacity-50 hover:opacity-100'}
              `}
            >
              {h}
            </button>
          ))}
        </div>

        <div className="text-xl font-bold text-muted-foreground z-20 pb-1">:</div>

        {/* Minutes Column */}
        <div 
          ref={minuteRef}
          className="flex-1 h-full overflow-y-auto no-scrollbar snap-y snap-mandatory scroll-smooth py-20"
        >
          {minutes.map((m) => (
            <button
              key={m}
              onClick={() => updateTime(displayHour, m, period)}
              className={`
                w-full h-11 flex items-center justify-center text-sm font-medium transition-all snap-center cursor-pointer
                ${minutesVal === m ? 'text-primary text-xl font-bold' : 'text-muted-foreground hover:text-foreground opacity-50 hover:opacity-100'}
              `}
            >
              {m.toString().padStart(2, '0')}
            </button>
          ))}
        </div>

        {/* Period Column */}
        <div 
          ref={periodRef}
          className="w-16 h-full overflow-y-auto no-scrollbar snap-y snap-mandatory scroll-smooth py-20 border-l border-border/50 ml-2"
        >
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => updateTime(displayHour, minutesVal, p)}
              className={`
                w-full h-11 flex items-center justify-center text-sm font-bold transition-all snap-center cursor-pointer
                ${period === p ? 'text-primary text-lg' : 'text-muted-foreground hover:text-foreground opacity-40 hover:opacity-100'}
              `}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

TimePicker.displayName = "TimePicker";
