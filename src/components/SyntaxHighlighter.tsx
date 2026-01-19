import React from 'react';
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter';
import { useTheme } from './ThemeProvider';

interface SyntaxHighlighterProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  className?: string; // Wrapper class
  showLineNumbers?: boolean;
}

export const SyntaxHighlighter = React.forwardRef<HTMLDivElement, SyntaxHighlighterProps>(({
  code,
  language = 'javascript',
  className = '',
  showLineNumbers = false,
  ...props
}, ref) => {
  const { syntaxThemeStyle } = useTheme();

  return (
    <div ref={ref} className={`rounded-md overflow-hidden ${className}`} {...props}>
        <ReactSyntaxHighlighter
          language={language}
          style={syntaxThemeStyle}
          showLineNumbers={showLineNumbers}
          customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.875rem', lineHeight: '1.5' }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </ReactSyntaxHighlighter>
    </div>
  );
});

SyntaxHighlighter.displayName = "SyntaxHighlighter";
