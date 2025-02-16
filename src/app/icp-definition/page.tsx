import { LandingPageLayout } from '@/components/layout/LandingPageLayout';

export const metadata = {
  title: 'ICP Definition',
  description: 'Define your ICPs effectively',
};

export default function ICPDefinition() {
    return (
      <LandingPageLayout>
      <div className="lp space-y-8 md:space-y-16">
        <section className="hero-section text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold py-6 md:py-12 leading-tight">
          Define your ICPs effectively
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold py-8 md:py-16 px-4 md:px-20 leading-normal">
          We help you define your ICPs effectively, and help you with positioning and messaging.
          </h2>
        </section>
      </div>
      </LandingPageLayout>
    );
  }