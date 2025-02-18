import { getAllTools } from '@/lib/tools';
import ToolCard from '@/components/ui/ToolCard';

export const metadata = {
  title: 'Tools - RocketLift Digital',
  description: 'Explore our collection of useful tools and utilities for developers and marketers.',
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
          <p className="text-xl text-gray-600">
            A collection of useful tools to help streamline your workflow
          </p>
        </div>
        
        <div className="space-y-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
} 