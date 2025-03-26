import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  BookOpenCheck,
  LogOut,
  Bold,
  Italic,
  List,
  Heading,
  Image as ImageIcon,
  Calendar,
  Users,
  Eye,
  Download,
  Save,
  Send
} from 'lucide-react';

import getCurrentDateTime from '@/lib/tools';

const sampleContent = `
<h1>Advanced Machine Learning Algorithms: Neural Networks Explained</h1>

<p>In today's comprehensive lecture, we explored the fascinating world of neural networks and their pivotal role in modern AI systems. This newsletter summarizes the key concepts and insights shared during our session.</p>

<h2>Key Topics Covered</h2>

<ul>
  <li>Fundamental concepts of neural networks</li>
  <li>Biological inspiration behind artificial neural networks</li>
  <li>Core components and architecture</li>
  <li>Practical applications in AI systems</li>
</ul>

<h2>Understanding Neural Networks</h2>

<p>Neural networks are computing systems inspired by biological neural networks found in animal brains. The basic unit of computation, known as a neuron or node, receives input from other nodes or external sources to compute an output.</p>

<h2>Practical Applications</h2>

<p>We discussed various real-world applications, including:</p>
<ul>
  <li>Image and speech recognition</li>
  <li>Natural language processing</li>
  <li>Autonomous vehicles</li>
  <li>Medical diagnosis</li>
</ul>
`;



export default function Page() {
  const [title, setTitle] = useState('Advanced Machine Learning Algorithms: Neural Networks Explained');
  const [audience, setAudience] = useState('public');
  const [publishDate, setPublishDate] = useState(getCurrentDateTime());
  const [previewMode, setPreviewMode] = useState(false);
  const [featuredImage, setFeaturedImage] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: sampleContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none',
      },
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Create Your Newsletter</h1>
          <p className="mt-2 text-gray-600">
            Customize your content before publishing your newsletter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Newsletter Content Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Input */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Newsletter Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-medium text-gray-700">Featured Image</h2>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              {featuredImage ? (
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-gray-900">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-gray-100' : ''}`}
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-gray-100' : ''}`}
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded ${editor?.isActive('bulletList') ? 'bg-gray-100' : ''}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded ${editor?.isActive('heading') ? 'bg-gray-100' : ''}`}
                  >
                    <Heading className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div style={{ minHeight: '200px' }}>
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Newsletter Settings</h2>
              
              {/* Audience Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Audience
                </label>
                <div className="relative">
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="subscribers">Specific Subscribers</option>
                  </select>
                  <Users className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Publish Date */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule Publish Date
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="block w-full pl-3 pr-4.5 py-2 text-base border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-gray-900 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Newsletter
                </button>
                <button
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-gray-900 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save as Draft
                </button>
                <button
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Publish Newsletter
                </button>
                <button
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-gray-900 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
