'use client';

import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react';
import rocketImage from '@/assets/rocket.png'; 
import LogoContainer from '@/components/layout/LogoContainer';
import { ContactButton } from '@/components/contact/ContactButton';

export function Navigation() {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <nav className="border-b px-4 bg-white shadow-sm">
      <div className="navbar container mx-auto flex items-center justify-between py-4">
        <LogoContainer>
          <Image src={rocketImage} alt="RocketLift" className="logo-image inline-block w-12 h-16 pr-4"/> 
          <div className="text-xl font-semibold">RocketLift</div>
        </LogoContainer>

        <div className="flex items-center space-x-6 pr-0 md:pr-20">
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Blog
            </Link>

            <div className="relative group">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                onBlur={() => setTimeout(() => setIsToolsOpen(false), 200)}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Tools</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isToolsOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isToolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <Link 
                    href="/tools/mermaid-diagrams"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    Mermaid Diagram Editor
                  </Link>
                  <Link 
                    href="/tools/plantuml-diagrams"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    PlantUML Diagram Editor
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="https://www.milangupta.io" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              About
            </Link>
          </div>

          <ContactButton 
            variant="navbar" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          />
        </div>
      </div>
    </nav>
  );
}

