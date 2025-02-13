import { getAllBlogs } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';

export default function BlogRoll() {
  const allBlogs = getAllBlogs();
  const latestBlogs = allBlogs.slice(0, 3); // Get the latest three blogs

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center">Latest Blog Posts</h2>
      <div className="space-y-6">
        {latestBlogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  );
} 