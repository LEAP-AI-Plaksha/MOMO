import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Button } from '.././components/Button';

export function SummaryPage() {
  return (
    <div className="mx-auto max-w-4xl py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h2 className="text-2xl font-bold text-gray-900">Lecture Summaries</h2>
        
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Short Summary</h3>
          <textarea
            className="min-h-[200px] w-full resize-none rounded-md border-gray-300 p-4 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Short summary will appear here..."
          />
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Long Summary</h3>
          <textarea
            className="min-h-[400px] w-full resize-none rounded-md border-gray-300 p-4 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Long summary will appear here..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Edit Summaries</Button>
          <Button>Create Newsletter</Button>
        </div>
      </motion.div>
    </div>
  );
}