import { getAllBlogs, filterBlogs } from '@/lib/blog';
import BlogCard from '@/components/ui/BlogCard';

interface BlogRollProps {
  numberOfPosts?: number;
  categories?: string[];
  featured?: boolean;
  postIds?: string[];
}

export default function BlogRoll({ numberOfPosts = undefined, categories, featured, postIds }: BlogRollProps) {
    const allBlogs = getAllBlogs();
  
    const latestBlogs = filterBlogs(allBlogs, { numberOfPosts, categories, featured, postIds });
  
    return (
      <section className="container mx-auto px-0.1 md:px-4">
        <div className="space-y-6">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>
    );
  }