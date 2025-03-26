'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { DubbingJob, VideoItem } from "./types";
import Image from "next/image";

interface DubbingJobsGridProps {
  dubbingJobs: DubbingJob[];
  videos: VideoItem[];
}

export function DubbingJobsGrid({ dubbingJobs, videos }: DubbingJobsGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {dubbingJobs.filter(job => job.status === 'completed').map((job) => {
        const video = videos.find(v => v.id === job.videoId);
        if (!video) return null;
        
        return (
          <Card key={job.requestId} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <Image 
                src={video.thumbnail} 
                alt={video.title}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
                {video.duration}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{video.title}</h3>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full text-xs flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Dubbed
                </div>
              </div>
              <p className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full mt-2 inline-block">
                {job.targetLanguage.charAt(0).toUpperCase() + job.targetLanguage.slice(1)}
              </p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  onClick={() => job.result?.video.url && window.open(job.result.video.url, '_blank')}
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8"
                >
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {dubbingJobs.filter(job => job.status !== 'completed').map((job) => {
        const video = videos.find(v => v.id === job.videoId);
        if (!video) return null;
        
        return (
          <Card key={job.requestId} className="overflow-hidden">
            <div className="aspect-video bg-muted relative flex items-center justify-center">
              <Image 
                src={video.thumbnail} 
                alt={video.title}
                className="object-cover opacity-50"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{video.title}</h3>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full text-xs flex items-center">
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  {job.status === 'queued' ? 'Queued' : 'Processing'}
                </div>
              </div>
              <p className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full mt-2 inline-block">
                {job.targetLanguage.charAt(0).toUpperCase() + job.targetLanguage.slice(1)}
              </p>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">
                  {job.status === 'queued' 
                    ? 'Queued for processing...' 
                    : 'Dubbing and lip-syncing in progress...'}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 