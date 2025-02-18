'use client';

import { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import Link from 'next/link';

const defaultMermaidCode = `graph TD
    A[Start] --> B[Process]
    B --> C[End]
    
    style A fill:#4285f4,stroke:#333,stroke-width:2px,rx:10px,ry:10px
    style B fill:#0f9d58,stroke:#333,stroke-width:2px,rx:10px,ry:10px
    style C fill:#db4437,stroke:#333,stroke-width:2px,rx:10px,ry:10px`;

const MermaidEditor = () => {
  const [mermaidCode, setMermaidCode] = useState(defaultMermaidCode);
  const [customStyle, setCustomStyle] = useState('');
  const [error, setError] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  const renderDiagram = async () => {
    try {
      setError('');
      const { svg } = await mermaid.render('mermaid-diagram', mermaidCode);
      const container = document.getElementById('diagram-output');
      if (container) {
        container.innerHTML = svg;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while rendering the diagram');
    }
  };

  const exportAsImage = async () => {
    try {
      setIsExporting(true);
      setError('');
      
      // Get the SVG element and its dimensions
      const svgElement = document.querySelector('#diagram-output svg');
      if (!svgElement) {
        throw new Error('No diagram found to export');
      }

      // Get the SVG data
      const svgData = new XMLSerializer().serializeToString(svgElement);
      
      // Add XML declaration and encode special characters
      const svgString = `<?xml version="1.0" encoding="UTF-8"?>${svgData}`;
      const encodedData = encodeURIComponent(svgString);
      
      // Create a data URL
      const dataUrl = `data:image/svg+xml,${encodedData}`;
      
      // Get the dimensions and calculate scaling factor
      const svgRect = svgElement.getBoundingClientRect();
      const aspectRatio = svgRect.width / svgRect.height;
      let targetWidth, targetHeight;
      
      if (aspectRatio > 1) {
        // Wider than tall
        targetWidth = 1080;
        targetHeight = Math.round(1080 / aspectRatio);
      } else {
        // Taller than wide
        targetHeight = 1080;
        targetWidth = Math.round(1080 * aspectRatio);
      }
      
      // Create an image to hold the SVG
      const img = new Image();
      img.width = targetWidth;
      img.height = targetHeight;
      
      // Set cross-origin to anonymous
      img.crossOrigin = 'anonymous';
      
      // Create canvas with high resolution
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not create canvas context');
      }

      // Set up promise to handle image loading
      const imageLoadPromise = new Promise((resolve, reject) => {
        img.onload = () => {
          // Fill white background
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Enable image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // Draw the image
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          
          try {
            // Convert to PNG with maximum quality
            const pngUrl = canvas.toDataURL('image/png', 1.0);
            
            // Trigger download
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'mermaid-diagram.png';
            downloadLink.click();
            
            resolve(null);
          } catch (err) {
            reject(err);
          }
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
      });

      // Set image source and wait for it to load
      img.src = dataUrl;
      
      await imageLoadPromise;
      setIsExporting(false);
    } catch (err: any) {
      setError(err.message || 'Failed to export diagram');
      setIsExporting(false);
    }
  };

  useEffect(() => {
    renderDiagram();
  }, [mermaidCode, customStyle]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mermaid Diagram Editor</h1>
          <Link 
            href="/tools/plantuml-diagrams"
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>Try PlantUML Editor</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mermaid Syntax
              </label>
              <textarea
                value={mermaidCode}
                onChange={(e) => setMermaidCode(e.target.value)}
                className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
                placeholder="Enter your Mermaid syntax here...
Example styling:
style NodeName fill:#4285f4,stroke:#333,stroke-width:2px,rx:10px,ry:10px"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom CSS Styling (optional - for advanced users)
              </label>
              <textarea
                value={customStyle}
                onChange={(e) => setCustomStyle(e.target.value)}
                className="w-full h-32 p-4 border rounded-lg font-mono text-sm"
                placeholder="Add custom CSS styling for the SVG output...
Example:
#diagram-output .node rect { filter: drop-shadow(2px 2px 2px gray); }"
              />
            </div>

            <button
              onClick={renderDiagram}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Render Diagram
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Output</h2>
              <button
                onClick={exportAsImage}
                disabled={isExporting}
                className={`px-4 py-2 bg-green-600 text-white rounded-lg transition-colors flex items-center space-x-2
                  ${isExporting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-700'}`}
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Export as PNG</span>
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <div 
              id="diagram-output"
              className="w-full overflow-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MermaidEditor;
