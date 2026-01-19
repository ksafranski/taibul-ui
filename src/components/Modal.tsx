"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import { Heading } from './Typography';

interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'width' | 'children'> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string | number;
}

const ModalMain = React.forwardRef<HTMLDivElement, ModalProps>(({ isOpen, onClose, children, width, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = 'unset';
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Clean up overflow on unmount if component was destroyed while open
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted || !shouldRender) return null;

  const maxWidth = width ? (typeof width === 'number' ? `${width}px` : width) : '32rem';

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${!isOpen ? 'pointer-events-none' : ''}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-background/80 backdrop-blur-sm ${
          isOpen ? 'animate-in fade-in duration-300' : 'animate-out fade-out duration-300'
        }`}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative w-full transform overflow-hidden rounded-xl border border-border bg-background shadow-2xl ${
          isOpen ? 'animate-in zoom-in-95 duration-200' : 'animate-out zoom-out-95 duration-200'
        }`}
        style={{ maxWidth }}
        ref={ref}
        {...props}
      >
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
});

ModalMain.displayName = "Modal";



const Header = ({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) => (
  <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
    <Heading level={3} className="m-0!">{children}</Heading>
    {onClose && (
      <button 
        onClick={onClose}
        className="rounded-md p-1 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    )}
  </div>
);

const Content = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-6 overflow-y-auto max-h-[70vh]">
    {children}
  </div>
);

const Footer = ({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) => (
  <div className="flex items-center justify-end gap-3 border-t border-border/40 px-6 py-4">
    {onClose && (
      <Button variant="outline" onClick={onClose}>Close</Button>
    )}
    {children}
  </div>
);

ModalMain.displayName = "Modal";

export const Modal = Object.assign(ModalMain, {
  Header,
  Content,
  Footer
});
