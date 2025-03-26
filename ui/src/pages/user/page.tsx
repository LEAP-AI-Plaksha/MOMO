import React from 'react';
import { 
  BookOpenCheck, 
  Upload, 
  FileText, 
  Mail, 
  Clock, 
  Plus,
  LogOut,
  ChevronRight,
  Layout
} from 'lucide-react';

// Mock data for demonstration
const recentTranscriptions = [
  { id: 1, title: 'Introduction to Psychology', date: '2024-03-10', duration: '45:32' },
  { id: 2, title: 'Advanced Mathematics Lecture 3', date: '2024-03-09', duration: '52:18' },
  { id: 3, title: 'World History: Renaissance', date: '2024-03-08', duration: '38:45' },
];

const savedNewsletters = [
  { id: 1, title: 'Weekly Psychology Insights', date: '2024-03-10' },
  { id: 2, title: 'Math Concepts Explained', date: '2024-03-09' },
];

export default function Page() {
  const userName = "Sarah"; // This would come from your auth system

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
              <a href="#" className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}!</h1>
          <p className="mt-2 text-gray-600">
            Manage your lectures, transcriptions, and newsletters in one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="flex items-center justify-center p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group">
            <Upload className="h-6 w-6 mr-2" />
            <span className="font-medium">Upload New Lecture</span>
            <ChevronRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="flex items-center justify-center p-6 bg-white text-gray-900 rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-colors group">
            <FileText className="h-6 w-6 mr-2 text-blue-600" />
            <span className="font-medium">View All Lectures</span>
            <ChevronRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="flex items-center justify-center p-6 bg-white text-gray-900 rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-colors group">
            <Mail className="h-6 w-6 mr-2 text-blue-600" />
            <span className="font-medium">Create Newsletter</span>
            <ChevronRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transcriptions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Transcriptions</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentTranscriptions.map((transcription) => (
                <div key={transcription.id} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{transcription.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{transcription.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(transcription.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="ml-4 text-gray-400 hover:text-gray-600">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Newsletters */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Saved Newsletters</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {savedNewsletters.map((newsletter) => (
                <div key={newsletter.id} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{newsletter.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{new Date(newsletter.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="ml-4 text-gray-400 hover:text-gray-600">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button className="w-full mt-4 p-4 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center">
                <Plus className="h-5 w-5 mr-2" />
                <span className="font-medium">Create New Newsletter</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}