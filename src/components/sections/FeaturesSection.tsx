import { Card } from '@/components/ui/card';
import Link from 'next/link';
export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center leading-snug">Our Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Link href="/icp-definition"><Card className="p-6">
          <h3 className="text-xl font-bold mb-4 leading-normal">ICP Definition & Positioning</h3>
          <p className="text-gray-600 leading-relaxed">We help with deep diving into your ICP, and understanding what problems they are looking to solve. Basis this, we help you define your positioning and messaging.</p>
        </Card></Link>
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 leading-normal">SEO</h3>
          <p className="text-gray-600 leading-relaxed">We help you with SEO audits, and help you with SEO strategy and implementation.</p>
        </Card>
        {/* Repeat for other features */}
      </div>
    </section>
  );
} 