import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const readingTime = Math.ceil((blog.wordCount || 0) / 200);

  return (
    <Link href={`/blog/${blog.slug}`} className="text-primary hover:underline">
    <div className="p-6 border rounded-lg shadow-md">
      <div className="flex flex-row h-[20vh] md:h-[160px] overflow-hidden">
        <div className="blog-image-container order-last md:order-first w-[120px] md:w-[200px] min-w-[120px] md:min-w-[200px] md:mr-6 ml-4 md:ml-0">
          <Image 
            src={blog.image || '/images/2025/02/json-ld/Website-marketing-tool.webp'} 
            alt={blog.title}
            width={200}
            height={250}
            className="w-full h-full object-cover rounded-lg"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
                {blog.title}
            </h2>
            <p className="text-gray-600 mb-4 hidden md:block">
              <span>{new Date(blog.date).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}</span> | 
              <span className="px-4">Reading Time: {readingTime} minute</span>
            </p>
            <p className="text-gray-700">{blog.excerpt}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
} 