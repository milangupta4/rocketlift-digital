'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { config } from '@/lib/config';

interface ApiResponse {
  status: number;
  body: SitemapData;
}

interface SitemapData {
  csvData: string;
  totalUrls: number;
}

export default function SitemapConverter() {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [results, setResults] = useState<SitemapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Format and validate the URL
    let formattedUrl = sitemapUrl.trim();
    
    // Add https:// if no protocol is specified
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Check if it's a sitemap file
    if (!formattedUrl.includes('sitemap') && !formattedUrl.endsWith('.xml')) {
      setError('Please provide a valid sitemap URL (should contain "sitemap" or end with ".xml")');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/api/sitemap-converter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sitemapUrl: formattedUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to convert sitemap');
      }

      const data: ApiResponse = await response.json();
      if (data.status === 200) {
        setResults(data.body);
      } else {
        throw new Error('Failed to convert sitemap');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = () => {
    if (!results) return;
    
    const blob = new Blob([results.csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const renderResults = () => {
    if (!results || !results.csvData) return null;

    const rows = results.csvData
      .split('\n')
      .slice(1) // Skip header row
      .filter((row: string) => row.trim()) // Remove empty rows
      .map((row: string) => row.split(','));

    if (rows.length === 0) {
      return (
        <Card className="p-6">
          <div className="text-center text-gray-600">
            No data found in the sitemap
          </div>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sitemap Results</h3>
            <div className="space-x-4">
              <span className="text-sm text-gray-600">Total URLs: {results.totalUrls}</span>
              <Button onClick={downloadCsv}>Download CSV</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change Frequency</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row: string[], index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span>{row[0].replace(/^"|"$/g, '')}</span>
                        <a 
                          href={row[0].replace(/^"|"$/g, '')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[1]?.replace(/^"|"$/g, '') || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[2]?.replace(/^"|"$/g, '') || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[3]?.replace(/^"|"$/g, '') || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 w-full md:w-3/4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sitemap Converter</h1>
        <Link 
          href="/tools/keyword-extractor"
          className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
        >
          <span>Try Keyword Extractor</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
      
      <div className="mb-8">
        <p className="text-lg mb-4">
          Convert any sitemap.xml file to CSV format. Simply enter the URL of the sitemap.xml file below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <Input
            value={sitemapUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSitemapUrl(e.target.value)}
            placeholder="Enter sitemap.xml URL (e.g. https://example.com/sitemap.xml)"
            className="w-full mb-4"
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading || !sitemapUrl}
        >
          {loading ? 'Converting...' : 'Convert Sitemap'}
        </Button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
          {error}
        </div>
      )}

      {renderResults()}
    </div>
  );
} 