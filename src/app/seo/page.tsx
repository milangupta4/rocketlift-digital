import BlogRoll from '@/components/BlogRoll';

export default function SEOPage() {
    return (
      <div className="lp space-y-8 md:space-y-16">
        <section className="hero-section text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold py-6 md:py-12 leading-tight">
          Build an SEO strategy that compounds over time
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold py-8 md:py-16 px-4 md:px-20 leading-normal">
          We help you build an SEO strategy, founded on good quality content and a solid foundation.
          </h2>
        </section>
        <section className="container mx-auto px-1 md:px-4">
          <h2 className="text-3xl font-semibold mb-8 md:mb-16 text-center">We provide full set of solutions to helping you grow your business</h2>
        </section>
        <div className="home-alternating-background">
        <div className="container mx-auto px-4 py-8 w-full md:w-[70%]">
          <h2 className="text-3xl font-semibold mb-8 md:mb-16 text-center">Latest Blog Posts</h2>
          <BlogRoll 
            numberOfPosts={3}
            categories={["SEO"]}
            />
          </div>
        </div>
      </div>
    );
  }