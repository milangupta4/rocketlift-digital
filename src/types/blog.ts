export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    content: string;
    excerpt?: string;
    author?: string;
    wordCount?: number;
  };