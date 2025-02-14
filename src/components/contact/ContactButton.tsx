"use client";

import { Button } from '@/components/ui/button';
import { useContactForm } from '@/contexts/ContactFormContext';

interface ContactButtonProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'navbar' | 'hero';
}

const variants = {
  default: 'px-8 py-6 text-lg bg-blue-200 hover:bg-blue-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200',
  navbar: 'px-4 py-2 text-sm bg-blue-700 text-white rounded-full hover:bg-blue-700/90',
  hero: 'px-16 py-4 text-lg bg-blue-200 hover:bg-blue-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200'
};

export function ContactButton({ 
  className = '', 
  children = 'Contact Us',
  variant = 'default' 
}: ContactButtonProps) {
  const { openModal } = useContactForm();

  return (
    <Button 
      className={`${variants[variant]} ${className}`}
      onClick={openModal}
    >
      {children}
    </Button>
  );
} 