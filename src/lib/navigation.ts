import { getAllBlogs } from './blog';

interface NavItem {
  title: string;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function getFooterNavigation(): NavSection[] {
  // Get the latest 5 blog posts
  const latestBlogs = getAllBlogs()
    .slice(0, 5)
    .map(blog => ({
      title: blog.title,
      path: `/blog/${blog.slug}`
    }));

  return [
    {
      title: 'Blog',
      items: [
        {
          title: 'All Posts',
          path: '/blog'
        },
        ...latestBlogs
      ]
    },
    {
      title: 'Tools',
      items: [
        {
          title: 'Mermaid Diagram Editor',
          path: '/tools/mermaid-diagrams'
        },
        {
          title: 'PlantUML Diagram Editor',
          path: '/tools/plantuml-diagrams'
        }
      ]
    },
    {
      title: 'Solutions',
      items: [
        {
          title: 'SEO Strategy',
          path: '/seo'
        },
        {
          title: 'Outbound Strategy',
          path: '/outbound-strategy'
        },
        {
          title: 'ICP Definition',
          path: '/icp-definition'
        },
        {
          title: 'Email Marketing',
          path: '/email-marketing'
        },
        {
          title: 'G2 Trust Platform Marketing',
          path: '/g2-trust-platform-marketing'
        },
        {
          title: 'Revenue First Analytics',
          path: '/revenue-first-analytics'
        }
      ]
    }
  ];
} 