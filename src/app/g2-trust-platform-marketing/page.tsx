import { LandingPageLayout } from '@/components/layout/LandingPageLayout';

export const metadata = {
  title: 'G2 Trust Platform Marketing',
  description: 'Run campaigns targeted to get good quality ratings from your customers on G2.',
};

export default function G2TrustPlatformMarketing() {
    return (
      <LandingPageLayout>
        <div className="lp space-y-8 md:space-y-16">
          <section className="hero-section text-center px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-bold py-6 md:py-12 leading-tight">
              Leverage high-quality reviews on G2
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold py-8 md:py-16 px-4 md:px-20 leading-normal">
              Run campaigns targeted to get good quality ratings from your customers, so that prospective customers can see your trustworthiness.
            </h2>
          </section>
        </div>
      </LandingPageLayout>
    );
  }