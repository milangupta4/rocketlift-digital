"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ContactFormModal from '@/components/ContactFormModal';

export function HomePageClient({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home-page space-y-8 md:space-y-16">
      {/* Hero Section */}
      <section className="hero-section text-center px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold py-6 md:py-12 leading-tight">
          SaaS Growth Strategies that Scale
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold py-8 md:py-16 px-4 md:px-20 leading-normal">
          We execute across SEO, Social Media, Ads, and Referral platforms to help you grow your business.
        </h2>
        <Button 
          className="px-8 py-6 text-lg bg-blue-200 hover:bg-blue-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200" 
          onClick={handleOpenModal}
        >
          Contact Us
        </Button>
      </section>

      {/* Rest of the content */}
      {children}

      {/* CTA Section */}
      <section className="text-center py-16 bg-primary text-primary-foreground">
        <h2 className="text-3xl font-semibold mb-4">Ready to Accelerate Your Growth?</h2>
        <p className="text-lg mb-8">Join RocketLift today and take your business to the next level with our expert strategies.</p>
        <Button 
          className="px-16 py-4 text-lg bg-blue-200 hover:bg-blue-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200" 
          onClick={handleOpenModal}
        >
          Get Started Now
        </Button>
      </section>

      {/* Contact Form Modal */}
      {isModalOpen && <ContactFormModal onClose={handleCloseModal} />}
    </div>
  );
} 