import React from 'react';

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  return (
    <div className="relative">
      {language && (
        <div className="absolute right-2 top-2 px-2 py-1 text-xs font-mono bg-gray-700 text-white rounded">
          {language}
        </div>
      )}
      <code className={className}>
        {children}
      </code>
    </div>
  );
}; 