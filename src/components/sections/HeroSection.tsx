import { ContactButton } from '@/components/contact/ContactButton';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  showContactButton?: boolean;
}

export function HeroSection({ title, subtitle, showContactButton = false }: HeroSectionProps) {
  return (
    <section className="hero-section text-center px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold py-6 md:py-12 leading-tight">
        {title}
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold py-8 md:py-16 px-4 md:px-20 leading-normal">
        {subtitle}
      </h2>
      {showContactButton && <ContactButton variant="hero">Get Started Now</ContactButton>}
    </section>
  );
} 