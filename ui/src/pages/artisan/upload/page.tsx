import React, { useState, useRef } from 'react';
import { 
  BookOpenCheck,
  LogOut,
  Upload,
  File,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const SUPPORTED_FORMATS = ['.mp4', '.mov', '.avi'];
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB in bytes

const CATEGORIES = [
  'Computer Science',
  'Business',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Literature',
  'Psychology',
  'Other',
];

const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese',
  'Korean',
  'Russian',
  'Arabic',
  'Other'
];

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('English');

  const handleFileSelect = (selectedFile: File) => {
    setErrorMessage('');
    
    if (!SUPPORTED_FORMATS.some(format => selectedFile.name.toLowerCase().endsWith(format))) {
      setErrorMessage('Unsupported file type. Please upload a valid video file.');
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrorMessage('File size exceeds 500MB limit. Please upload a smaller file.');
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploadStatus('uploading');
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval);
      setUploadStatus('processing');
      setTimeout(() => {
        setUploadStatus('complete');
      }, 2000);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpenCheck className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LectureScript</span>
            </div>
            <nav className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
              <button className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Your Lecture</h1>
          <p className="mt-2 text-gray-600">
            Upload your lecture video and get an instant AI-powered transcription.
          </p>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          {/* Upload Box */}
          <div 
            className={`relative border-2 border-dashed rounded-lg p-8 text-center
              ${isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              ${file ? 'bg-gray-50' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drag and drop your video file here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    or click to browse from your computer
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Select File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={SUPPORTED_FORMATS.join(',')}
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: MP4, MOV, AVI (max 500MB)
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                <div className="flex items-center">
                  <File className="h-8 w-8 text-blue-600" />
                  <div className="ml-4 text-left">
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="absolute inset-x-0 -bottom-12 flex items-center justify-center text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errorMessage}
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm text-gray-900">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Lecture Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 pl-3 pr-3 pt-1 pb-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 pl-3 pr-3 pt-1 pb-1 min-h-40 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 pl-3 pr-3 pt-1 pb-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 pl-3 pr-3 pt-1 pb-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadStatus !== 'idle' && (
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {uploadStatus === 'uploading' && (
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin mr-2" />
                  )}
                  {uploadStatus === 'processing' && (
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin mr-2" />
                  )}
                  {uploadStatus === 'complete' && (
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  )}
                  <span className="font-medium text-gray-900">
                    {uploadStatus === 'uploading' && 'Uploading...'}
                    {uploadStatus === 'processing' && 'Processing...'}
                    {uploadStatus === 'complete' && 'Upload Complete!'}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {uploadProgress}%
                </span>
              </div>
              <div className="overflow-hidden bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!file || !title || !category || uploadStatus !== 'idle'}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white
                ${(!file || !title || !category || uploadStatus !== 'idle')
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              Upload & Transcribe
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}