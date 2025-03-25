'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface VideoStatusProps {
  processingId: string;
}

interface VideoStatusData {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  sourceVideo: {
    url: string;
    uploadcareId: string;
    cloudinaryId?: string;
    size?: number;
    format?: string;
  };
  transformedVideo?: {
    url: string;
    cloudinaryId: string;
  };
  error?: string;
  startedAt: string;
  completedAt?: string;
}

export function VideoStatus({ processingId }: VideoStatusProps) {
  const [status, setStatus] = useState<VideoStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/video/status?processingId=${processingId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch video status');
        }

        const data = await response.json();
        setStatus(data);

        if (data.status === 'failed') {
          toast.error(data.error || 'Video processing failed');
        } else if (data.status === 'completed') {
          toast.success('Video processing completed');
        }
      } catch (error) {
        console.error('Error checking video status:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to check video status');
      } finally {
        setIsLoading(false);
      }
    };

    // Check status immediately
    checkStatus();

    // Poll for status updates every 5 seconds if not completed or failed
    const interval = setInterval(() => {
      if (status?.status !== 'completed' && status?.status !== 'failed') {
        checkStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [processingId, status?.status]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load video status</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Video Processing Status</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Status</h3>
            <p className={`mt-1 ${
              status.status === 'completed' ? 'text-green-600' :
              status.status === 'failed' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
            </p>
          </div>

          {status.error && (
            <div>
              <h3 className="text-lg font-medium">Error</h3>
              <p className="mt-1 text-red-600">{status.error}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium">Source Video</h3>
            <video
              src={status.sourceVideo.url}
              controls
              className="mt-2 w-full rounded-lg"
            />
          </div>

          {status.transformedVideo && (
            <div>
              <h3 className="text-lg font-medium">Transformed Video</h3>
              <video
                src={status.transformedVideo.url}
                controls
                className="mt-2 w-full rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Started At</h3>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(status.startedAt).toLocaleString()}
              </p>
            </div>

            {status.completedAt && (
              <div>
                <h3 className="text-sm font-medium">Completed At</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(status.completedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 