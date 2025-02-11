import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogData } from '@/lib/blog';
import { BlogPost } from '@/types/blog';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-6">{new Date(blog.date).toLocaleDateString()}</p>
      <div className="prose prose-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
      </div>
    </article>
  );
}
