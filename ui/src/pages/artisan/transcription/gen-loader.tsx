import React, { useState, useEffect } from 'react';
import { BookOpenCheck, Check } from 'lucide-react';

export default function TranscriptionLoadingBuffer() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => setShowContinue(true), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpenCheck className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LectureScript</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {!isComplete ? (
            <>
              {/* Loading Animation Container */}
              <div className="flex flex-col items-center mb-8">
                {/* Circular Progress */}
                <div className="w-32 h-32 mb-8">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                    />
                    {/* Progress circle */}
                    <circle
                      className="text-blue-600 transition-all duration-300 ease-in-out"
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                      strokeDasharray={264}
                      strokeDashoffset={264 - (progress / 100) * 264}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-xl font-semibold text-gray-700">{progress}%</span>
                  </div>
                </div>

                {/* Waveform Animation */}
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-blue-600 rounded-full animate-waveform"
                      style={{
                        height: '20px',
                        animation: `waveform 1s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Loading Text */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Generating Transcription...
              </h2>
              <p className="text-gray-500 text-center max-w-md">
                We're processing your lecture. This usually takes a few minutes.
              </p>
            </>
          ) : (
            <>
              {/* Completion State */}
              <div className="mb-8 transform scale-100 transition-transform duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 animate-fade-in">
                Transcription Complete!
              </h2>
              <p className="text-gray-500 text-center max-w-md mb-8 animate-fade-in">
                Your lecture has been successfully transcribed and is ready for review.
              </p>
              {showContinue && (
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200 animate-fade-in focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  View Transcription
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
