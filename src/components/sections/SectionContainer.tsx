interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  width?: 'full' | 'wide' | 'medium' | 'narrow';
  background?: 'default' | 'alternate';
}

export function SectionContainer({ 
  children, 
  className = '', 
  width = 'medium',
  background = 'default' 
}: SectionContainerProps) {
  const widthClasses = {
    full: 'w-full',
    wide: 'w-full md:w-[80%]',
    medium: 'w-full md:w-[70%]',
    narrow: 'w-full md:w-[60%]'
  };

  return (
    <div className={background === 'alternate' ? 'home-alternating-background' : 'default-section-background'}>
      <section className={`container mx-auto px-4 py-8 ${widthClasses[width]} ${className}`}>
        {children}
      </section>
    </div>
  );
} 