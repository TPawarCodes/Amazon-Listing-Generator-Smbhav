import React from 'react';
import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
}

export function GenerateButton({ onClick, loading }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          Generate Listing
        </>
      )}
    </button>
  );
}