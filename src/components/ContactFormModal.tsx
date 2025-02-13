"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ContactFormModalProps {
  onClose: () => void;
}

interface ContactFormData {
  name: string;
  companyName: string;
  companyWebsite: string;
  needHelpWith: string[];
}

export default function ContactFormModal({ onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    companyName: '',
    companyWebsite: '',
    needHelpWith: [],
  });
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setFormData(prev => {
        const newProblems = checked
          ? [...prev.needHelpWith, value]
          : prev.needHelpWith.filter(problem => problem !== value);
        return { ...prev, needHelpWith: newProblems };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    
    try {
      // Make API request
      const response = await fetch('https://api.milangupta.io/api/rocketlift-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Store in localStorage for backup
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </Button>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">
              Company Website
            </label>
            <input
              type="text"
              id="companyWebsite"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">Need Help With</span>
            <div className="flex flex-wrap gap-2">
              {['Email marketing', 'SEO Content'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFormData(prev => {
                      const isSelected = prev.needHelpWith.includes(option);
                      const newProblems = isSelected
                        ? prev.needHelpWith.filter(problem => problem !== option)
                        : [...prev.needHelpWith, option];
                      return { ...prev, needHelpWith: newProblems };
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${formData.needHelpWith.includes(option)
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitStatus === 'success'}
            >
              {submitStatus === 'success' ? 'Submitted!' : 'Submit'}
            </Button>
          </div>
        </form>
        
        {submitStatus === 'success' && (
          <div className="text-green-600 mt-4">
            Thank you for your submission! We&apos;ll be in touch soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="text-red-600 mt-4">
            An error occurred. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
} 