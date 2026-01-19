"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps & React.HTMLAttributes<HTMLDivElement>>(({ children, className = '', ...props }, ref) => {
  return (
    <div ref={ref} className={`rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
});

Card.displayName = "Card";

const Header = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const Content = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Footer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CardCompound = Object.assign(Card, {
  Header,
  Content,
  Footer
}) as React.ForwardRefExoticComponent<CardProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> & {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
};

export { CardCompound as Card };
