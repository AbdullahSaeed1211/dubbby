'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { VideoItem } from "./types";
import Image from "next/image";

interface VideoGridProps {
  videos: VideoItem[];
  onDubVideo: (videoId: string) => void;
}

export function VideoGrid({ videos, onDubVideo }: VideoGridProps) {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.map(video => (
        <Card key={video.id} className="overflow-hidden">
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
            <h3 className="font-medium truncate">{video.title}</h3>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-muted-foreground">
                Uploaded {video.uploadDate}
              </p>
              <p className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                {video.language}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8"
                onClick={() => onDubVideo(video.id)}
              >
                <Languages className="h-3 w-3 mr-1" />
                Dub
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8"
                onClick={() => video.url && window.open(video.url, '_blank')}
              >
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 