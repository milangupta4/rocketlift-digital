'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const defaultPlantUMLCode = `@startuml
actor User
participant "First Class" as A
participant "Second Class" as B
participant "Last Class" as C

User -> A: DoWork
activate A

A -> B: Create Request
activate B

B -> C: DoWork
activate C
C --> B: WorkDone
destroy C

B --> A: Request Created
deactivate B

A --> User: Done
deactivate A
@enduml`;

const PlantUMLEditor = () => {
  const [plantUMLCode, setPlantUMLCode] = useState(defaultPlantUMLCode);
  const [error, setError] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isScriptsLoaded, setIsScriptsLoaded] = useState(false);

  const renderDiagram = useCallback(async () => {
    try {
      setError('');
      const encoded = window.plantumlEncoder.encode(plantUMLCode);
      const container = document.getElementById('diagram-output');
      if (container) {
        container.innerHTML = `<img src="https://www.plantuml.com/plantuml/png/${encoded}" alt="PlantUML Diagram" />`;
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while rendering the diagram';
      setError(errorMessage);
    }
  }, [plantUMLCode]);

  useEffect(() => {
    if (isScriptsLoaded) {
      renderDiagram();
    }
  }, [isScriptsLoaded, renderDiagram]);

  const exportAsImage = async () => {
    try {
      setIsExporting(true);
      setError('');
      
      const encoded = window.plantumlEncoder.encode(plantUMLCode);
      const imageUrl = `https://www.plantuml.com/plantuml/png/${encoded}`;
      
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = 'plantuml-diagram.png';
      downloadLink.click();
      
      setIsExporting(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to export diagram';
      setError(errorMessage);
      setIsExporting(false);
    }
  };

  return (
    <>
      <Script 
        src="https://unpkg.com/plantuml-encoder/dist/plantuml-encoder.min.js"
        onLoad={() => setIsScriptsLoaded(true)}
      />
      
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">PlantUML Diagram Editor</h1>
            <Link 
              href="/tools/mermaid-diagrams"
              className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>Try Mermaid Editor</span>
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
                  PlantUML Syntax
                </label>
                <textarea
                  value={plantUMLCode}
                  onChange={(e) => setPlantUMLCode(e.target.value)}
                  className="w-full h-96 p-4 border rounded-lg font-mono text-sm"
                  placeholder="Enter your PlantUML syntax here..."
                />
              </div>

              <button
                onClick={renderDiagram}
                disabled={!isScriptsLoaded}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={isExporting || !isScriptsLoaded}
                  className={`px-4 py-2 bg-green-600 text-white rounded-lg transition-colors flex items-center space-x-2
                    ${(isExporting || !isScriptsLoaded) ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-700'}`}
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
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              {!isScriptsLoaded && (
                <div className="text-blue-500 mb-4 p-4 bg-blue-50 rounded-lg">
                  Loading PlantUML encoder...
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
    </>
  );
};

export default PlantUMLEditor; 