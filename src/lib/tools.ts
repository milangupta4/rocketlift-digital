export interface Tool {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
}

export const tools: Tool[] = [
  {
    id: 'mermaid-diagrams',
    title: 'Mermaid Diagram Editor',
    description: 'Create flowcharts, sequence diagrams, and more using Mermaid JS syntax with live preview and PNG export.',
    image: '/tools/mermaid.svg',
    path: '/tools/mermaid-diagrams'
  },
  {
    id: 'plantuml-diagrams',
    title: 'PlantUML Diagram Editor',
    description: 'Design UML diagrams including sequence, use case, and class diagrams with PlantUML syntax and live preview.',
    image: '/tools/plantuml.svg',
    path: '/tools/plantuml-diagrams'
  }
];

export function getAllTools(): Tool[] {
  return tools;
} 