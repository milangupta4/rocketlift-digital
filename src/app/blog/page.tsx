import Link from 'next/link';
import { getAllBlogs } from '@/lib/blog';
import { BlogPost } from '@/types/blog';
import rocketImage from '@/assets/rocket.png'; 
import Image from 'next/image';

export const metadata = {
  title: 'Blog | RocketLift Digital',
  description: 'Read the latest articles and updates from RocketLift Digital.',
};

export default function BlogPage() {
  const blogs: BlogPost[] = getAllBlogs();
  
  return (
    <div className="blog-page container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="space-y-6">
        {blogs.map((blog) => {
            const readingTime = Math.ceil((blog.wordCount || 0 )/ 200);
            return (
            <div key={blog.slug} className="p-6 border rounded-lg shadow-md flex flex-row">
                <Image src={rocketImage} alt="RocketLift" className="w-12 h-12"/> 
                <div>
                    <h2 className="text-2xl font-semibold mb-2">
                    <Link href={`/blog/${blog.slug}`} className="text-primary hover:underline">
                        {blog.title}
                    </Link>
                    </h2>
                    <p className="text-gray-600 mb-4"><span>{new Date(blog.date).toLocaleDateString()}</span> |  <span className="px-4">Reading Time: {readingTime} minute</span></p>
                    <p className="text-gray-700 mb-4">{blog.excerpt}</p>
                    <Link href={`/blog/${blog.slug}`} className="text-blue-500 hover:underline">
                    Read More
                    </Link>
                </div>
            </div>
            );
        })}
      </div>
    </div>
  );
}
