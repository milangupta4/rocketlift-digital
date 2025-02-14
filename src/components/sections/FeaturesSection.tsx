import { Card } from '@/components/ui/card';
import Link from 'next/link';

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-1 md:px-4">
      <h2 className="text-3xl font-semibold mb-8 md:mb-16 text-center leading-snug">We bring a full-stack toolkit to help grow your business</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 grid-rows-auto">
        <Link href="/icp-definition">
          <Card className="p-6 h-full">
            <h3 className="text-xl font-bold mb-4 leading-normal">ICP Definition & Positioning</h3>
            <p className="text-gray-600 leading-relaxed">
              We help with deep diving into your ICP, and understanding what problems they are looking to solve. Basis this, we help you define your positioning and messaging.
            </p>
          </Card>
        </Link>
        <Link href="/seo">
          <Card className="p-6 h-full">
            <h3 className="text-xl font-bold mb-4 leading-normal">SEO - Content & Technical</h3>
            <p className="text-gray-600 leading-relaxed">
              We help you with SEO audits, and help you with SEO strategy and implementation.
            </p>
          </Card>
        </Link>
        <Link href="/g2-trust-platform-marketing">
          <Card className="p-6 h-full">
            <h3 className="text-xl font-bold mb-4 leading-normal">G2 & Trust Platform Marketing</h3>
            <p className="text-gray-600 leading-relaxed">
              We help you with SEO audits, and help you with SEO strategy and implementation.
            </p>
          </Card>
        </Link>
        <Link href="/email-marketing">
          <Card className="p-6 h-full">
            <h3 className="text-xl font-bold mb-4 leading-normal">Email marketing</h3>
            <p className="text-gray-600 leading-relaxed">
              Design email campaigns to nurture your leads, and drive renewals among your existing customers.
            </p>
          </Card>
        </Link>
        <Link href="/outbound-strategy">
          <Card className="p-6 h-full">
            <h3 className="text-xl font-bold mb-4 leading-normal">Outbound Strategy</h3>
            <p className="text-gray-600 leading-relaxed">
              Plan your outbound campaigns, around data insights, Email & Cold calling.
            </p>
          </Card>
        </Link>
        <Link href="/revenue-first-analytics">
          <Card className="p-6 h-full">
            <h3 className="text-xl font-bold mb-4 leading-normal">Revenue-first Analytics</h3>
            <p className="text-gray-600 leading-relaxed">
              Prepare detailed reports connecting marketing performance, pipeline & revenue
            </p>
          </Card>
        </Link>

      </div>
    </section>
  );
} 