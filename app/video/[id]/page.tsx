import { VideoStatus } from '@/app/components/videos/VideoStatus';
import { Toaster } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VideoPage({ params }: any) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoStatus processingId={params.id} />
        </div>
      </main>
      <Toaster />
    </div>
  );
} 