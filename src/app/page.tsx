import { FeaturesSection } from '@/components/sections/FeaturesSection';
import BlogRoll from '@/components/BlogRoll';
import { HomePageClient } from '@/components/HomePageClient';

export default function Home() {
  return (
    <HomePageClient>
      {/* Features Section */}
      <div className="container mx-auto px-4 py-8 w-full md:w-[80%]">
        <FeaturesSection />
      </div>

      {/* Blog Roll Section */}
      <div className="home-alternating-background">
        <div className="container mx-auto px-4 py-8 w-full md:w-[70%]">
          <h2 className="text-3xl font-semibold mb-8 text-center">Latest Blog Posts</h2>
          <BlogRoll 
            numberOfPosts={3}
          />
        </div>
      </div>

      {/* About Us Section */}
      <section className="container mx-auto px-4 w-full md:w-[60%]">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Growth Philosophy: Experiment, Learn, Scale</h2>
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
      </section>
    </HomePageClient>
  );
}