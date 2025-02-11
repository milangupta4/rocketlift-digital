import Image from "next/image";
// import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { FeaturesSection } from '@/components/sections/FeaturesSection';

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-16">
      <section className="hero-section text-center px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold py-6 md:py-12 leading-tight">
        Growth Strategies that Scale
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold py-8 md:py-16 px-4 md:px-20 leading-normal">
        Growth tactics that scale & build value long-term
        </h2>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* About Us Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">About Us</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image src="../../assets/about-us.png" alt="About Us" className="w-full h-auto rounded-lg shadow-md" />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <p className="text-gray-700 mb-4">
              At RocketLift, our mission is to empower businesses with cutting-edge growth strategies that drive success and scalability. Our dedicated team of experts is committed to delivering exceptional results tailored to your unique needs.
            </p>
            <p className="text-gray-700">
              Join us on our journey to revolutionize the industry and achieve remarkable growth together.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section className="text-center py-16 bg-primary text-primary-foreground">
        <h2 className="text-3xl font-semibold mb-4">Ready to Accelerate Your Growth?</h2>
        <p className="text-lg mb-8">Join RocketLift today and take your business to the next level with our expert strategies.</p>
        <Button className="px-8 py-3 text-lg">Get Started Now</Button>
      </section>
    </div>
  );
}