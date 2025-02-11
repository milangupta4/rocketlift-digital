import { Card } from '@/components/ui/card';

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center leading-snug">Our Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 leading-normal">Feature One</h3>
          <p className="text-gray-600 leading-relaxed">Description of the first feature, explaining its benefits and usage.</p>
        </Card>
        {/* Repeat for other features */}
      </div>
    </section>
  );
} 