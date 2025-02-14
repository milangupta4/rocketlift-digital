interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className = '' }: SectionHeaderProps) {
  return (
    <h2 className={`text-3xl font-semibold mb-8 md:mb-16 text-center ${className}`}>
      {title}
    </h2>
  );
} 