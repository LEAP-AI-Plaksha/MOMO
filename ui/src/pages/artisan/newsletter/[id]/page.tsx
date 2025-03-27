import React, { useState } from 'react';
import { format } from 'date-fns';
import Head from 'next/head';
import {
  BookOpenCheck,
  ArrowLeft,
  Share2,
  Heart,
  Bookmark,
  MessageSquare,
  Send,
  ThumbsUp,
  Reply,
  MoreHorizontal,
} from 'lucide-react';

async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;

  // Fetch newsletter data based on the ID
  const response = await fetch(`https://api.example.com/newsletters/${id}`);
  const newsletter = await response.json();

  if (!newsletter) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      newsletter,
    },
  };
}


// Sample newsletter data
const newsletter = {
  id: 1,
  title: 'Advanced Machine Learning Algorithms: Neural Networks Explained',
  author: 'Dr. Sarah Chen',
  publishDate: '2024-03-15T10:00:00',
  readTime: '8 min read',
  content: `
    <p class="lead">
      Neural networks have revolutionized the field of machine learning, enabling breakthrough advances in image recognition, natural language processing, and more.
    </p>

    <h2>Understanding Neural Networks</h2>
    <p>
      At their core, neural networks are computational models inspired by the human brain. They consist of interconnected nodes (neurons) organized in layers, each performing specific mathematical operations on input data.
    </p>

    <div class="callout">
      <strong>Key Insight:</strong> The power of neural networks lies in their ability to learn complex patterns from data through a process called backpropagation.
    </div>

    <h2>Types of Neural Networks</h2>
    <ul>
      <li>Feedforward Neural Networks</li>
      <li>Convolutional Neural Networks (CNNs)</li>
      <li>Recurrent Neural Networks (RNNs)</li>
      <li>Transformers</li>
    </ul>

    <figure>
      <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800" alt="Neural Network Visualization" />
      <figcaption>A visual representation of a neural network architecture</figcaption>
    </figure>

    <h2>Applications in Real World</h2>
    <p>
      Neural networks have found applications across various domains:
    </p>
    <ul>
      <li>Computer Vision</li>
      <li>Natural Language Processing</li>
      <li>Speech Recognition</li>
      <li>Game Playing</li>
    </ul>

    <div class="callout">
      <strong>Future Directions:</strong> As hardware capabilities improve and new architectures are developed, we can expect neural networks to become even more powerful and efficient.
    </div>
  `,
  likes: 156,
  bookmarks: 42,
  comments: [
    {
      id: 1,
      author: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
      content: 'Great explanation of neural networks! The visuals really helped me understand the concepts better.',
      likes: 12,
      timestamp: '2024-03-15T12:30:00',
      replies: [
        {
          id: 2,
          author: 'Dr. Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
          content: 'Thank you, John! Glad you found it helpful.',
          likes: 5,
          timestamp: '2024-03-15T13:15:00',
        },
      ],
    },
  ],
  relatedNewsletters: [
    {
      id: 2,
      title: 'Understanding Quantum Computing: A Comprehensive Guide',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Michael Zhang',
    },
    {
      id: 3,
      title: 'The Future of Artificial Intelligence in Healthcare',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Emily Johnson',
    },
  ],
};

export default function Page() {
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{newsletter.title}</title>
        <meta name="description" content={newsletter.title} />
      </Head>
      {/* Minimal Header */}
      {/* <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <BookOpenCheck className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">LectureScript</span>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 pt-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {newsletter.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
              <span>{newsletter.author}</span>
              <span>•</span>
              <span>{format(new Date(newsletter.publishDate), 'MMM d, yyyy')}</span>
              <span>•</span>
              <span>{newsletter.readTime}</span>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none px-8 py-6 text-gray-800"
            dangerouslySetInnerHTML={{ __html: newsletter.content }}
          />

          {/* Article Footer */}
          <div className="px-8 py-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="inline-flex items-center text-gray-600 hover:text-blue-600">
                  <Heart className="h-5 w-5 mr-2" />
                  <span>{newsletter.likes}</span>
                </button>
                <button className="inline-flex items-center text-gray-600 hover:text-blue-600">
                  <Bookmark className="h-5 w-5 mr-2" />
                  <span>{newsletter.bookmarks}</span>
                </button>
                <button 
                  className="inline-flex items-center text-gray-600 hover:text-blue-600"
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>{newsletter.comments.length}</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        {showComments && (
          <section className="mt-8 bg-white rounded-lg shadow-sm">
            <div className="px-8 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Comments</h2>
              
              {/* New Comment Form */}
              <div className="flex items-start space-x-4 mb-8">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    rows={3}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {newsletter.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <img
                      src={comment.avatar}
                      alt={`${comment.author}'s avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg px-4 py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-gray-600">{comment.content}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {comment.likes}
                          </button>
                          <button className="flex items-center hover:text-blue-600">
                            <Reply className="h-4 w-4 mr-1" />
                            Reply
                          </button>
                          <span>{format(new Date(comment.timestamp), 'MMM d, yyyy')}</span>
                        </div>
                      </div>

                      {/* Replies */}
                      {comment.replies?.map((reply) => (
                        <div key={reply.id} className="mt-4 flex space-x-4">
                          <img
                            src={reply.avatar}
                            alt={`${reply.author}'s avatar`}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="bg-gray-50 rounded-lg px-4 py-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-900">{reply.author}</span>
                                <button className="text-gray-400 hover:text-gray-500">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-gray-600">{reply.content}</p>
                              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                <button className="flex items-center hover:text-blue-600">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  {reply.likes}
                                </button>
                                <span>{format(new Date(reply.timestamp), 'MMM d, yyyy')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Newsletters */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Newsletters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsletter.relatedNewsletters.map((related) => (
              <div key={related.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={related.thumbnail}
                  alt={related.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-500">By {related.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
