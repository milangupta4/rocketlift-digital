import { HeroSection } from '@/components/sections/HeroSection';
import { LandingPageLayout } from '@/components/layout/LandingPageLayout';
import { SectionContainer } from '@/components/sections/SectionContainer';
import { SectionHeader } from '@/components/sections/SectionHeader';

export default function RevenueFirstAnalytics() {
  return (
    <LandingPageLayout>
      <HeroSection
        title="Revenue-first analytics"
        subtitle="We create dashboards that connect marketing performance, pipeline & revenue."
      />
      
      <SectionContainer width="medium">
        <SectionHeader title="We provide full set of solutions to helping you grow your business" />
      </SectionContainer>
    </LandingPageLayout>
  );
}