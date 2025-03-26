"use client"; // Required for client-side hooks like useState and useEffect

import { useState, useEffect } from "react";
import { CheckCircle2, FileText, Loader2 } from "lucide-react";

export default function NewsletterLoadingBuffer() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Generating your personalized newsletter...";

  useEffect(() => {
    // Typing effect
    if (typedText.length < fullText.length && !isComplete) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isComplete]);

  useEffect(() => {
    // Progress bar animation
    if (progress < 100 && !isComplete) {
      const timeout = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 50);
      return () => clearTimeout(timeout);
    }

    // Set complete after progress reaches 100%
    if (progress === 100 && !isComplete) {
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, isComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Newsletter Generator</h1>
            <p className="text-gray-600">{typedText}</p>
          </div>

          {/* Loading Animation */}
          <div className="relative">
            {!isComplete ? (
              <div className="flex flex-col items-center space-y-6">
                {/* Stacking Pages Animation */}
                <div className="relative w-16 h-16">
                  <FileText
                    className="w-16 h-16 text-blue-500 animate-pulse absolute"
                    style={{
                      animation: "stack 2s ease-in-out infinite",
                      opacity: 0.3,
                    }}
                  />
                  <FileText
                    className="w-16 h-16 text-blue-500 animate-pulse absolute"
                    style={{
                      animation: "stack 2s ease-in-out infinite 0.5s",
                      opacity: 0.6,
                    }}
                  />
                  <FileText
                    className="w-16 h-16 text-blue-500 animate-pulse absolute"
                    style={{
                      animation: "stack 2s ease-in-out infinite 1s",
                    }}
                  />
                </div>

                {/* Spinner */}
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
                <h2 className="text-xl font-semibold text-gray-900 animate-fade-in">
                  Newsletter Ready!
                </h2>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Action Button */}
          {isComplete && (
            <button
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium
                         transform transition duration-200 hover:bg-blue-600 hover:scale-[1.02]
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         animate-fade-in"
              onClick={() => console.log("View newsletter")}
            >
              View Newsletter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
