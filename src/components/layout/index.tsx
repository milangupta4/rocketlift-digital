import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

import { ReactNode } from 'react';
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
