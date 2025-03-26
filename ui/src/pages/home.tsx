import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, BookOpen, Share2, FileText, Clock, Star, Users } from 'lucide-react';
import { Button } from '@/components/Button';

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Upload Lectures',
    description: 'Share your knowledge by uploading video lectures easily.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Auto Transcription',
    description: 'Get accurate transcriptions powered by advanced AI.',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Smart Summaries',
    description: 'Generate concise summaries in multiple formats.',
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: 'Share Newsletters',
    description: 'Convert and share your content as professional newsletters.',
  },
];

const recentNewsletters = [
  {
    id: '1',
    title: 'Understanding Modern Web Architecture',
    author: 'Sarah Chen',
    date: '2024-03-15',
    readTime: '5 min read',
    likes: 234,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    author: 'David Kumar',
    date: '2024-03-14',
    readTime: '8 min read',
    likes: 186,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '3',
    title: 'The Future of Cloud Computing',
    author: 'Emily Rodriguez',
    date: '2024-03-13',
    readTime: '6 min read',
    likes: 159,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2400',
  },
];

export default function HomePage() {
  const isLoggedIn = false; // TODO: Replace with actual auth state

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Transform Your Lectures into
            <span className="text-blue-600"> Engaging Content</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Upload your lectures, get instant transcriptions, and create professional
            newsletters with AI-powered summaries. Share your knowledge effectively.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            {isLoggedIn ? (
              <>
                <Link href="/upload" >
                  <Button size="lg">
                    Upload Lecture
                  </Button>
                </Link>
                <Link href="/dashboard" >
                  <Button variant="outline" size="lg">
                    Go to Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" >
                  <Button size="lg" >
                    Get Started
                  </Button>
                </Link>
                <Link href="#features" >
                  <Button variant="outline" size="lg" as="a">
                    Learn More
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative scroll-mt-16">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-gray-900"
          >
            Everything You Need
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 inline-block rounded-lg bg-blue-100 p-3 text-blue-600 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Newsletters Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-gray-900"
          >
            Latest Published Newsletters
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentNewsletters.map((newsletter, index) => (
              <motion.article
                key={newsletter.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={newsletter.image}
                    alt={newsletter.title}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {newsletter.title}
                  </h3>
                  <div className="mb-4 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {newsletter.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {newsletter.readTime}
                    </span>
                    <span className="flex items-center">
                      <Star className="mr-1 h-4 w-4" />
                      {newsletter.likes}
                    </span>
                  </div>
                  <Link href={`/newsletter/${newsletter.id}`} >
                    <Button variant="outline" className="w-full">
                      Read Newsletter
                    </Button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-2xl bg-blue-600 px-8 py-16 text-center text-white"
        >
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Join thousands of educators and speakers who are already using our platform
            to share their knowledge effectively.
          </p>
          <Link href="/signup" >
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Start Creating Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}