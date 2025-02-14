import BlogRoll from '@/components/sections/BlogRoll';
import { LandingPageLayout } from '@/components/layout/LandingPageLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionContainer } from '@/components/sections/SectionContainer';
import { SectionHeader } from '@/components/sections/SectionHeader';

export default function SEOPage() {
  return (
    <LandingPageLayout>
      <HeroSection
        title="Build an SEO strategy that compounds over time"
        subtitle="We help you build an SEO strategy, founded on good quality content and a solid foundation."
      />
      <SectionContainer width="medium">
        <SectionHeader title="We provide full set of solutions to helping you grow your business" />
      </SectionContainer>
      <SectionContainer width="medium" background="alternate">
        <SectionHeader title="Latest Blog Posts" />
        <BlogRoll 
          numberOfPosts={3}
          categories={["SEO"]}
        />
      </SectionContainer>
    </LandingPageLayout>
  );
}