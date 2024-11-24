import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Amazon Listing Generator</h1>
        </div>
      </div>
    </header>
  );
}