import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { 
  BookOpenCheck, 
  LogOut, 
  Copy, 
  Download, 
  Mail, 
  Edit2, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

// Sample data - In a real app, this would come from your backend
const sampleTranscription = `Welcome to today's lecture on Advanced Machine Learning Algorithms. 
Today we'll be covering neural networks and their applications in modern AI systems.

First, let's understand what neural networks are. At their core, neural networks are computing systems inspired by the biological neural networks that constitute animal brains.

The basic unit of computation in a neural network is the neuron, also called a node or unit. This receives input from other nodes or from an external source and computes an output.

Let's dive deeper into the architecture...`;

const sampleSummary = `This lecture covers the fundamentals of neural networks in machine learning, including:
• Basic structure and components of neural networks
• How neural networks process information
• Applications in modern AI systems
• Practical implementation considerations

Key takeaways focus on understanding neural network architecture and its biological inspiration.`;

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [transcription, setTranscription] = useState(sampleTranscription);
  const [summary, setSummary] = useState(sampleSummary);
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([transcription], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'lecture-transcription.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lecture Transcription</h1>
          <p className="mt-2 text-gray-600">
            Here is the full transcription of your lecture. You can edit and save changes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transcription Section */}
          <div className="lg:col-span-2 space-y-4 text-gray-900">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Full Transcription <span className='text-gray-500'>{(isEditing)? "(editing)": ""}</span></h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </button>
              </div>
              <textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                disabled={!isEditing}
                className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm leading-relaxed focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-900 resize-none"
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={() => handleCopy(transcription)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">AI Summary</h2>
                <div className="relative">
                  <button
                    onClick={() => handleCopy(summary)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </button>
                  {showCopied && (
                    <div className="absolute right-0 -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                      Copied!
                    </div>
                  )}
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full h-77 p-4 border border-gray-200 rounded-md text-sm leading-relaxed focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
                />
              </div>
            </div>

            <button
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Mail className="h-5 w-5 mr-2" />
              Generate Newsletter
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}