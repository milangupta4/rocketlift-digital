import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/tools';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link 
      href={tool.path}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200"
    >
      <div className="flex items-center p-6">
        <div className="flex-shrink-0 w-16 h-16 mr-6">
          <Image
            src={tool.image}
            alt={tool.title}
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {tool.title}
          </h3>
          <p className="text-gray-600">
            {tool.description}
          </p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <svg 
            className="w-6 h-6 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </Link>
  );
} 