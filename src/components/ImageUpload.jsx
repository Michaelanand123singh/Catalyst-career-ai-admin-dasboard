import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import api from '../services/api';

const ImageUpload = ({ onImageUpload, currentImageUrl = '', className = '' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError('');
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const [data, error] = await api.uploadImage(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) {
        setError(error.message || 'Failed to upload image');
      } else {
        onImageUpload(data.url);
        setError('');
      }
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    onImageUpload('');
    setError('');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        handleFileSelect({ target: { files: [file] } });
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Featured Image
      </label>
      
      {/* Current Image Display */}
      {currentImageUrl && (
        <div className="relative">
          <img
            src={currentImageUrl}
            alt="Featured"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Upload Area */}
      {!currentImageUrl && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isUploading 
              ? 'border-amber-300 bg-amber-50' 
              : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="space-y-3">
              <Loader2 className="h-8 w-8 text-amber-500 animate-spin mx-auto" />
              <div className="text-sm text-gray-600">
                Uploading image... {uploadProgress}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="h-8 w-8 text-gray-400 mx-auto" />
              <div className="text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Click to upload
                </button>
                {' '}or drag and drop
              </div>
              <div className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload New Image Button (when image exists) */}
      {currentImageUrl && !isUploading && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Upload New Image
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
};

export default ImageUpload;
