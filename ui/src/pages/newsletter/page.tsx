import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  BookOpenCheck,
  LogOut,
  Search,
  PlusCircle,
  Eye,
  Pencil,
  Trash2,
  Calendar,
  BookOpen,
  ChevronDown,
  MoreVertical,
} from 'lucide-react';

// Sample newsletter data
const sampleNewsletters = [
  {
    id: 1,
    title: 'Advanced Machine Learning Algorithms: Neural Networks Explained',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400',
    publishDate: '2024-03-15T10:00:00',
    readCount: 245,
    category: 'Computer Science',
  },
  {
    id: 2,
    title: 'Understanding Quantum Computing: A Comprehensive Guide',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
    publishDate: '2024-03-14T15:30:00',
    readCount: 189,
    category: 'Physics',
  },
  {
    id: 3,
    title: 'The Future of Artificial Intelligence in Healthcare',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
    publishDate: '2024-03-13T09:15:00',
    readCount: 312,
    category: 'Healthcare',
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [newsletters, setNewsletters] = useState(sampleNewsletters);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const categories = ['All', 'Computer Science', 'Physics', 'Healthcare', 'Business', 'Mathematics'];

  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || newsletter.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: number) => {
    setNewsletters(newsletters.filter(n => n.id !== id));
    setShowDropdown(null);
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
              <a href="#" className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Create Newsletter
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
          <h1 className="text-3xl font-bold text-gray-900">Your Published Newsletters</h1>
          <p className="mt-2 text-gray-600">
            Manage your newsletters and keep them updated.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search newsletters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Create New Newsletter Button */}
            <div className="flex justify-start md:justify-end">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusCircle className="h-5 w-5 mr-2" />
                Create New Newsletter
              </button>
            </div>
          </div>
        </div>

        {newsletters.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No newsletters</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't published any newsletters yet. Start creating your first one!
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusCircle className="h-5 w-5 mr-2" />
                Create New Newsletter
              </button>
            </div>
          </div>
        ) : (
          // Newsletter Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNewsletters.map((newsletter) => (
              <div key={newsletter.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Thumbnail */}
                <div className="aspect-video relative">
                  <img
                    src={newsletter.thumbnail}
                    alt={newsletter.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(showDropdown === newsletter.id ? null : newsletter.id)}
                        className="p-1 rounded-full bg-white/90 hover:bg-white shadow-sm"
                      >
                        <MoreVertical className="h-5 w-5 text-gray-600" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {showDropdown === newsletter.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {/* View logic */}}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Newsletter
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {/* Edit logic */}}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit Newsletter
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => handleDelete(newsletter.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Newsletter
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                    {newsletter.title}
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(newsletter.publishDate), 'MMM d, yyyy')}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {newsletter.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {newsletter.readCount} reads
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
