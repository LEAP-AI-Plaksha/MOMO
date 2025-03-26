import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function ProcessingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing time and redirect
    const timer = setTimeout(() => {
      navigate('/transcription/123'); // Replace with actual video ID
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100"
        >
          <Sparkles className="h-8 w-8 text-blue-600" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Processing Your Lecture</h2>
          <p className="text-gray-600">Analyzing speech patterns and generating transcription...</p>
        </motion.div>
      </motion.div>
    </div>
  );
}