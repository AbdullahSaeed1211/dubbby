'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Download, Trash2, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  status: 'processing' | 'completed' | 'failed';
  createdAt: string;
  targetLanguage: string;
  duration: string;
}

const mockVideos: Video[] = [];

export function VideoList() {
  const [videos] = useState<Video[]>(mockVideos);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videos.length / 6);

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="flex flex-col items-center gap-4 max-w-sm text-center">
          <div className="p-4 rounded-full bg-muted">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">No videos yet</h3>
            <p className="text-sm text-muted-foreground">
              Upload your first video to start translating
            </p>
          </div>
          <Button asChild>
            <Link href="?tab=upload">Upload Video</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          My Videos <span className="text-muted-foreground">({videos.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <p className="text-sm">
            Page {currentPage} of {Math.max(1, totalPages)}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos
          .slice((currentPage - 1) * 6, currentPage * 6)
          .map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="aspect-video relative group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      disabled={video.status !== 'completed'}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      disabled={video.status !== 'completed'}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <Badge
                  variant={
                    video.status === 'completed'
                      ? 'success'
                      : video.status === 'processing'
                      ? 'default'
                      : 'destructive'
                  }
                  className="absolute top-2 right-2"
                >
                  {video.status}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm truncate" title={video.title}>
                  {video.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {video.targetLanguage}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {video.duration}
                  </p>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
} 