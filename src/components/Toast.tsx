"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Text } from './Typography';

type ToastType = 'success' | 'warning' | 'error';

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  exiting?: boolean;
}

interface ToastContextType {
  toast: (title: string, message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    
    // Actually remove after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const toast = useCallback((title: string, message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {mounted && createPortal(
        <div className="fixed top-6 right-6 z-100 flex flex-col gap-4 w-full max-w-sm pointer-events-none">
          {toasts.map((t) => (
            <ToastItem key={t.id} {...t} onRemove={() => removeToast(t.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

const ToastItem = ({ type, title, message, exiting, onRemove }: ToastMessage & { onRemove: () => void }) => {
  const borderColors = {
    success: 'border-t-green-500',
    warning: 'border-t-orange-500',
    error: 'border-t-red-500',
  };

  return (
    <div 
      className={`pointer-events-auto relative overflow-hidden rounded-lg border border-border bg-background shadow-lg border-t-4 ${borderColors[type]} 
        ${exiting ? 'animate-out fade-out slide-out-to-right-full duration-300' : 'animate-in slide-in-from-right-full duration-300'}`}
    >
      <div className="pt-3 pb-4 px-4 pr-10">
        <Text className="font-semibold mb-0.5! m-0!">{title}</Text>
        <Text variant="small" className="text-muted-foreground m-0!">{message}</Text>
      </div>
      <button 
        onClick={onRemove}
        className="absolute top-2.5 right-3 rounded-md p-1 hover:bg-accent text-muted-foreground transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  );
};
