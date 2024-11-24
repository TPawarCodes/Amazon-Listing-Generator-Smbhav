import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { ContentInput } from './components/ContentInput';
import { ImageUpload } from './components/ImageUpload';
import { GenerateButton } from './components/GenerateButton';
import { ListingOutput } from './components/ListingOutput';
import { generateListing } from './lib/gemini';
import type { ListingData, LoadingState } from './types';

function App() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [listing, setListing] = useState<ListingData | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateListing = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content first!');
      return;
    }

    setLoadingState('loading');
    try {
      const result = await generateListing(content);
      setListing(result);
      setLoadingState('success');
      toast.success('Listing generated successfully!');
    } catch (error) {
      setLoadingState('error');
      const message = error instanceof Error ? error.message : 'Failed to generate listing';
      toast.error(message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ContentInput content={content} onChange={setContent} />
            <ImageUpload image={image} onImageUpload={handleImageUpload} />
            <GenerateButton 
              onClick={handleGenerateListing} 
              loading={loadingState === 'loading'} 
            />
          </div>
          <ListingOutput listing={listing} />
        </div>
      </main>
    </div>
  );
}

export default App;