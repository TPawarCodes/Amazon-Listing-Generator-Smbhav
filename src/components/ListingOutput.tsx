import React from 'react';
import { Sparkles } from 'lucide-react';
import type { ListingData } from '../types';

interface ListingOutputProps {
  listing: ListingData | null;
}

export function ListingOutput({ listing }: ListingOutputProps) {
  if (!listing) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Listing</h2>
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Your generated listing will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Listing</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Title</h3>
          <p className="mt-1 text-gray-900">{listing.title}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1 text-gray-900 whitespace-pre-line">{listing.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Key Features</h3>
          <ul className="mt-1 list-disc list-inside space-y-1">
            {listing.bulletPoints.map((point, index) => (
              <li key={index} className="text-gray-900">{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Keywords</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {listing.keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}