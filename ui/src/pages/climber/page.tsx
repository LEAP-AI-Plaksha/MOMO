import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Star, Users } from 'lucide-react';
import { Button } from '@/components/Button';

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
const oldNewsletters = [
  {
    id: '4',
    title: 'Introduction to Blockchain Technology',
    author: 'Daniel Parker',
    date: '2023-12-25',
    readTime: '7 min read',
    likes: 200,
    image: 'https://images.unsplash.com/photo-1599480220716-355777328d2c?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '5',
    title: 'Web Development Basics',
    author: 'Jane Doe',
    date: '2023-12-20',
    readTime: '4 min read',
    likes: 178,
    image: 'https://images.unsplash.com/photo-1599724416576-76d5b2f4233f?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '6',
    title: 'React.js for Beginners',
    author: 'Michael Johnson',
    date: '2023-12-15',
    readTime: '3 min read',
    likes: 150,
    image: 'https://images.unsplash.com/photo-1599703271404-6855a367384d?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '7',
    title: 'Node.js and Express.js',
    author: 'Sarah Chen',
    date: '2023-12-10',
    readTime: '2 min read',
    likes: 120,
    image: 'https://images.unsplash.com/photo-1599698265347-782725418f96?auto=format&fit=crop&q=80&w=2400',
  }
];

export default function HomePage() {
  return (
    <div className="space-y-24">
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
      
      {/* Old Newsletters Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-gray-900"
          >
            Newsletters
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {oldNewsletters.map((newsletter, index) => (
              <motion.article
                key={newsletter.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="p-6">
                  <Link href={`/newsletter/${newsletter.id}`} >
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
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}