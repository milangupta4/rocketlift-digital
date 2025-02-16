import BlogRoll from '@/components/sections/BlogRoll';

export const metadata = {
  title: 'Blog',
  description: 'Read the latest articles and updates from RocketLift Digital.',
};

export default function BlogPage() {
  return (
    <div className="blog-page container mx-auto px-4 py-8 w-full md:w-[70%]">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <BlogRoll />
    </div>
  );
}
