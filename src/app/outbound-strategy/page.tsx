import { LandingPageLayout } from '@/components/layout/LandingPageLayout';
import { SectionContainer } from '@/components/sections/SectionContainer';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'Outbound Strategy',
  description: 'Design your outbound strategy',
};

export default function OutboundStrategy() {
  return (
    <LandingPageLayout>
      <div className="lp space-y-8 md:space-y-16">
        <section className="hero-section text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold py-6 md:py-12 leading-tight">
            Design your outbound strategy
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold py-8 md:py-16 px-4 md:px-20 leading-normal">
            We help you plan your outbound strategy, around data insights, Email & Cold calling.
          </h2>
        </section>

        <SectionContainer background="alternate">
          <SectionHeader title="Build Lead Enrichment Workflows" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Multi-Channel Lead Enrichment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Develop comprehensive lead enrichment workflows that leverage multiple data sources and channels. 
                  We help you integrate LinkedIn, company databases, and other professional networks to build detailed 
                  prospect profiles and ensure high-quality outreach.
                </p>
              </Card>
            </div>
            <div className="flex justify-center">
              <svg className="w-64 h-64 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader title="CRM Data Model Audit & Pipeline Forecasting" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <svg className="w-64 h-64 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 7L12 3L3 7M21 7L12 11M21 7V17L12 21M12 11L3 7M12 11V21M3 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Data-Driven Pipeline Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Optimize your CRM data models to capture the right information at every stage. Our audit process 
                  helps identify gaps in your data collection, improve data quality, and implement predictive 
                  analytics for accurate pipeline forecasting.
                </p>
              </Card>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer background="alternate">
          <SectionHeader title="Prospect Research Workflows" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Streamlined Prospect Research</h3>
                <p className="text-gray-600 leading-relaxed">
                  Develop efficient workflows for prospect research that combine automation with human intelligence. 
                  We help you create processes that identify high-value prospects, understand their pain points, 
                  and personalize your outreach for maximum impact.
                </p>
              </Card>
            </div>
            <div className="flex justify-center">
              <svg className="w-64 h-64 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </SectionContainer>
      </div>
    </LandingPageLayout>
  );
}