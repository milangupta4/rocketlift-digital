export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lp space-y-8 md:space-y-16">
      {children}
    </div>
  );
} 