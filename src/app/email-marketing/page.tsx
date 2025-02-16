import { LandingPageLayout } from '@/components/layout/LandingPageLayout';

export const metadata = {
  title: 'Email Marketing',
  description: 'Design email strategies that nurture prospects, drive renewals, resurrect churned users, and capture new leads',
};

export default function EmailMarketing() {
    return (
      <LandingPageLayout>
        <div className="lp space-y-8 md:space-y-16">
          <section className="hero-section text-center px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-bold py-6 md:py-12 leading-tight">
            Email marketing
            </h1>
          <h2 className="text-xl md:text-2xl font-semibold py-8 md:py-16 px-4 md:px-20 leading-normal">
          Design email strategies that nurture prospects, drive renewals, resurrect churned users, and capture new leads
          </h2>
        </section>
      </div>
    </LandingPageLayout>
  );
}