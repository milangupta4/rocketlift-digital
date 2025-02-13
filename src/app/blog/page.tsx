import { getAllBlogs } from '@/lib/blog';
import { BlogPost } from '@/types/blog';
import BlogCard from '@/components/BlogCard';


export const metadata = {
  title: 'Blog | RocketLift Digital',
  description: 'Read the latest articles and updates from RocketLift Digital.',
};

export default function BlogPage() {
  const blogs: BlogPost[] = getAllBlogs();
  
  return (
    <div className="blog-page container mx-auto px-4 py-8 w-full md:w-[70%]">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
