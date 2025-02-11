interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
  }
  
  export function Button({ children, className = '', asChild, ...props }: ButtonProps) {
    const Component = asChild ? 'span' : 'button'; // Use 'span' if asChild is true
  
    return (
      <Component 
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors 
                   focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 
                   bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }