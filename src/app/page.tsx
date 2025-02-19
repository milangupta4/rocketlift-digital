import { FeaturesSection } from '@/components/sections/FeaturesSection';
import BlogRoll from '@/components/sections/BlogRoll';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionContainer } from '@/components/sections/SectionContainer';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ContactButton } from '@/components/contact/ContactButton';
import { Metadata } from 'next';
import Image from 'next/image';
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'RocketLift Digital - SaaS Growth Strategies',
    description: 'We drive SEO, Ads, and Referral programs to help you grow your business.',
    openGraph: {
      title: 'RocketLift Digital - SaaS Growth Strategies',
      description: 'We drive SEO, Ads, and Referral programs to help you grow your business.',
      images: [
        {
          url: 'images/RocketLift-SEO-banner.png',
          width: 800,
          height: 600,
          alt: 'RocketLift Digital SEO Banner',
        },
      ],
    },
    alternates: {
      canonical: 'https://www.rocketlift.co'
    },
    verification: {
      other: {
        'structured-data': JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'RocketLift',
          'description': 'SaaS Growth Strategies that Scale',
          'url': 'https://www.rocketlift.co',
          'publisher': {
            '@type': 'Organization',
            'name': 'RocketLift Digital',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://www.rocketlift.co/images/logo.png'
            }
          }
        })
      }
    }
  };
};

export default function Home() {
  return (
    <div className="home-page space-y-8 md:space-y-16">
      <HeroSection
        title="SaaS Growth Strategies that Scale"
        subtitle="We execute across SEO, Social Media, Ads, and Referral platforms to help you grow your business."
        showContactButton={true}
      />

      <SectionContainer width="wide">
        <FeaturesSection />
      </SectionContainer>

      <SectionContainer width="medium" background="alternate">
        <SectionHeader title="We are your Ready-to-Go Marketing team" />
        <div className="flex flex-col lg:flex-col items-center">
            <p className="text-xl text-gray-700 mb-8 text-center">
              We build full-stack Demand-Gen pipeline - from creating Top-of-funnel Content across channels, to directly increasing your leads & pipeline.
            </p>
            <Image 
              src="/images/RocketLift-suite.webp"
              alt="Marketing Pipeline Diagram showing Inbound and Outbound strategies leading to Pipeline & ARR"
              className="w-full h-auto rounded-lg shadow-lg"
              width={1000}
              height={1000}
            />
        </div>
      </SectionContainer>

      <SectionContainer width="medium">
        <SectionHeader title="Latest Blog Posts" />
        <BlogRoll numberOfPosts={3} />
      </SectionContainer>

      <SectionContainer width="narrow">
        <SectionHeader title="Our Growth Philosophy: Experiment, Learn, Scale" />
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:pl-12">
            <p className="text-gray-700 text-lg mb-4">
              We believe Growth is about doing a bunch of experiments, learning what works, and then scaling them.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              We bring a toolkit that includes SEO, Content Marketing, Ads, and Referral platforms to help you grow your business.
            </p>
            <p className="text-gray-700 text-lg">
              Join us on our journey to revolutionize the industry and achieve remarkable growth together.
            </p>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="alternate">
        <div className="text-center">
          <SectionHeader title="Ready to Accelerate Your Growth?" />
          <p className="text-lg mb-8">
            Join RocketLift today and take your business to the next level with our expert strategies.
          </p>
          <ContactButton variant="hero">Get Started Now</ContactButton>
        </div>
      </SectionContainer>
    </div>
  );
}