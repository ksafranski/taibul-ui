"use client";

import { useEffect, useState, RefObject } from 'react';

export function useScrollSpy(
  ids: string[],
  options: { offset?: number; containerRef?: RefObject<HTMLElement | null> } = {}
) {
  const [activeId, setActiveId] = useState<string>('');
  const { offset = 0, containerRef } = options;

  useEffect(() => {
    const handleScroll = () => {
      let currentId = '';
      const container = containerRef?.current;
      
      // Calculate top reference point (viewPort top or container top)
      const containerTop = container ? container.getBoundingClientRect().top : 0;
      
      // We want to trigger when the element hits the top of the container + offset
      // Effective trigger line relative to viewport
      const triggerPoint = containerTop + offset;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementBottom = rect.bottom;

          // Check if element is active
          // An element is active if its top is above (or at) the trigger point
          // AND its bottom is below the trigger point
          // OR if it's the last element and close to bottom? 
          // Simple logic: Element top is <= triggerPoint and Bottom is > triggerPoint
          
          if (elementTop <= triggerPoint + 20 && elementBottom > triggerPoint + 20) {
            currentId = id;
          }
        }
      }
      
      // If we didn't find one intersecting the trigger point, maybe we are inside a huge section
      // or between sections. 
      // Let's stick to the overlap logic. 
      
      if (currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    const scrollContainer = containerRef?.current || window;
    
    // Add listener
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial position
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [ids, offset, activeId, containerRef]);

  return activeId;
}
