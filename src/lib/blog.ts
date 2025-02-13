import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types/blog';

const blogsDirectory = path.join(process.cwd(), 'src', 'content', 'blogs');

function getWordCount(content: string): number {
  // Remove any special characters and split by whitespace
  const words = content
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  return words.length;
}

export function getAllBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export function getBlogData(slug: string): BlogPost | null {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const wordCount = getWordCount(content);
  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author,
    excerpt: data.excerpt,
    content,
    wordCount,
  };
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const blogs = slugs.map((slug) => getBlogData(slug)).filter(Boolean) as BlogPost[];
  // Optionally, sort blogs by date
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
