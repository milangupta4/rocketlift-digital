import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogData } from '@/lib/blog';
import { BlogPost } from '@/types/blog';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MDXImage } from '@/components/MDXImage';

type PageProps = {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog: BlogPost | null = getBlogData(slug);

  if (!blog) {
    return {};
  }

  return {
    title: `${blog.title} | RocketLift Digital`,
    description: blog.excerpt || '',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog: BlogPost | null = getBlogData(slug);
  
  if (!blog) {
    notFound();
  }

  const readingTime = Math.ceil((blog.wordCount || 0 )/ 200);   
  return (
    <article className="container mx-auto px-4 py-8 w-full md:w-[60%]">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-6 py-4"><span>{new Date(blog.date).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}</span> | <span className="px-8">Reading time: {readingTime} minutes</span></p>
      <div className="prose prose-lg">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ src, alt }) => <MDXImage src={src || ''} alt={alt || ''} />
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
