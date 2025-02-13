interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
  }
  
  export function Card({ children, className = '', ...props }: CardProps) {
      return (
        <div 
          className={`rounded-lg border bg-card 
          text-card-foreground shadow-md p-4 ${className}`}
          {...props}
        >
          {children}
        </div>
      );
  }