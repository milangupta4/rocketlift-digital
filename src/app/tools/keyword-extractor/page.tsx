'use client';

import { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UrlPill } from '@/components/ui/url-pill';
import { isValidDomain, formatUrl } from '@/lib/url-utils';

interface UrlEntry {
  url: string;
  isValid: boolean;
}

export default function KeywordExtractor() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [urlList, setUrlList] = useState<UrlEntry[]>([]);
  const [results, setResults] = useState<Record<string, Record<string, number>> | null>(null);
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

      const response = await fetch('https://api.milangupta.io/api/keyword-extractor', {
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

    return Object.entries(results).map(([url, keywords]) => (
      <Card key={url} className="p-6 mb-4">
        <h3 className="text-lg font-semibold mb-4">{url}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(keywords)
            .sort(([, a], [, b]) => b - a)
            .map(([keyword, count]) => (
              <div key={keyword} className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <span className="font-medium">{keyword}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{count}</span>
              </div>
            ))}
        </div>
      </Card>
    ));
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