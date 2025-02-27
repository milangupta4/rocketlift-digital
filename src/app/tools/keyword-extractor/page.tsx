'use client';

import { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UrlPill } from '@/components/ui/url-pill';
import { isValidDomain, formatUrl } from '@/lib/url-utils';
import { config } from '@/lib/config';

interface KeywordInfo {
  count: number;
  isDomainSpecific: boolean;
  tfidfScore?: number;
}

interface ApiResponse {
  success: boolean;
  keywords: Record<string, KeywordInfo>;
  crawledPages: string[];
}

interface UrlEntry {
  url: string;
  isValid: boolean;
}

export default function KeywordExtractor() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [urlList, setUrlList] = useState<UrlEntry[]>([]);
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addUrl = (url: string) => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;

    // Check if URL already exists
    if (urlList.some(entry => entry.url === trimmedUrl)) {
      return;
    }

    const isValid = isValidDomain(trimmedUrl);
    setUrlList(prev => [...prev, { url: trimmedUrl, isValid }]);
    setCurrentUrl('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addUrl(currentUrl);
    }
  };

  const removeUrl = (indexToRemove: number) => {
    setUrlList(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const validUrls = urlList
        .filter(entry => entry.isValid)
        .map(entry => formatUrl(entry.url));

      if (validUrls.length === 0) {
        throw new Error('No valid URLs to process');
      }

      const response = await fetch(`${config.apiUrl}/api/keyword-extractor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          validUrls.length === 1 
            ? { url: validUrls[0] }
            : { urls: validUrls }
        ),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch keywords');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="space-y-6">
        {/* Crawled Pages Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Crawled Pages</h3>
          <div className="space-y-2">
            {results.crawledPages.map((page, index) => (
              <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                {page}
              </div>
            ))}
          </div>
        </Card>

        {/* Keywords Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Keywords Analysis</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Keyword
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Domain Specific
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TF-IDF Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(results.keywords)
                  .sort(([, a], [, b]) => b.count - a.count)
                  .map(([keyword, info]) => (
                    <tr key={keyword}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {keyword}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {info.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${info.isDomainSpecific ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {info.isDomainSpecific ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {info.tfidfScore?.toFixed(4) || 'N/A'}
                      </td>
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
      <h1 className="text-4xl font-bold mb-8">Keyword Extractor</h1>
      
      <div className="mb-8">
        <p className="text-lg mb-4">
          Extract keywords and their frequencies from any webpage. Enter URLs one at a time.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <Input
            value={currentUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a URL and press Enter or comma to add"
            className="w-full mb-4"
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {urlList.map((entry, index) => (
              <UrlPill
                key={index}
                url={entry.url}
                isValid={entry.isValid}
                onRemove={() => removeUrl(index)}
              />
            ))}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading || urlList.length === 0 || !urlList.some(entry => entry.isValid)}
        >
          {loading ? 'Extracting...' : 'Extract Keywords'}
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