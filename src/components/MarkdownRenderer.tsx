import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter';
import { useTheme } from './ThemeProvider';

interface MarkdownRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  className?: string;
}

export const MarkdownRenderer = React.forwardRef<HTMLDivElement, MarkdownRendererProps>(({
  content,
  className = '',
  ...props
}, ref) => {
  const { syntaxThemeStyle } = useTheme();

  return (
    <div ref={ref} className={`text-foreground leading-relaxed ${className}`} {...props}>
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 border-b border-border pb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-6 mb-4" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 text-muted-foreground" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-1 text-muted-foreground" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props} />,
          a: ({node, ...props}) => <a className="text-primary hover:underline cursor-pointer" {...props} />,
          code(props: any) {
            const {children, className, node, ...rest} = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <div className="my-4 rounded-md overflow-hidden">
                <ReactSyntaxHighlighter
                  {...rest}
                  style={syntaxThemeStyle}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: '1.5rem' }}
                >
                  {String(children).replace(/\n$/, '')}
                </ReactSyntaxHighlighter>
              </div>
            ) : (
              <code {...rest} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

MarkdownRenderer.displayName = "MarkdownRenderer";
