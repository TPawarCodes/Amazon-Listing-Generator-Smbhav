import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  image: string | null;
  onImageUpload: (file: File) => void;
}

export function ImageUpload({ image, onImageUpload }: ImageUploadProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-indigo-600" />
        Product Image
      </h2>
      <div
        {...getRootProps()}
        className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {image ? (
          <img src={image} alt="Preview" className="max-h-40 mx-auto" />
        ) : (
          <div className="space-y-2">
            <Upload className="h-8 w-8 mx-auto text-gray-400" />
            <p className="text-gray-500">Drag & drop an image or click to select</p>
          </div>
        )}
      </div>
    </div>
  );
}