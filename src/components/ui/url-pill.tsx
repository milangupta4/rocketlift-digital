import { FC } from 'react';

interface UrlPillProps {
  url: string;
  isValid: boolean;
  onRemove: () => void;
}

export const UrlPill: FC<UrlPillProps> = ({ url, isValid, onRemove }) => {
  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm 
        ${isValid ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}
    >
      <span className="truncate max-w-[200px]">{url}</span>
      <button
        type="button"
        onClick={onRemove}
        className="hover:text-gray-700 focus:outline-none"
      >
        ×
      </button>
    </div>
  );
}; 