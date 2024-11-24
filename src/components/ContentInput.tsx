import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ContentInputProps {
  content: string;
  onChange: (content: string) => void;
}

export function ContentInput({ content, onChange }: ContentInputProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-indigo-600" />
        Social Media Content
      </h2>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="mt-4 w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Paste your social media content here..."
      />
    </div>
  );
}