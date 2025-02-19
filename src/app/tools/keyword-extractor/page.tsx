'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export default function KeywordExtractor() {
  const [urls, setUrls] = useState<string>('');
  const [results, setResults] = useState<Record<string, Record<string, number>> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Split URLs by newline and filter empty lines
      const urlList = urls.split('\n').filter(url => url.trim());
      
      const response = await fetch('https://api.milangupta.io/api/keyword-extractor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          urlList.length === 1 
            ? { url: urlList[0] }
            : { urls: urlList }
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
    <div className="container mx-auto py-8 w-full md:w-3/4">
      <h1 className="text-4xl font-bold mb-8">Keyword Extractor</h1>
      
      <div className="mb-8">
        <p className="text-lg mb-4">
          Extract keywords and their frequencies from any webpage. Enter one URL per line.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <Textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="Enter URLs (one per line)"
            rows={5}
            className="w-full"
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
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