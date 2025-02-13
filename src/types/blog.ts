export type BlogPost = {
    post_id: string;
    slug: string;
    title: string;
    date: string;
    content: string;
    excerpt?: string;
    author?: string;
    wordCount?: number;
    image?: string;
    categories: string[];
    featured?: boolean;
};