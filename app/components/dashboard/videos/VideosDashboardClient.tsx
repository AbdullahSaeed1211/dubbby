"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast/use-toast";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDubbing } from "@/hooks/use-dubbing";
import { DashboardTabs } from "../common/DashboardTabs";
import { DubbingJob, UploadcareOutput, VideoItem } from "./types";
import Image from "next/image";

const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv"];

const formSchema = z.object({
  targetLanguage: z.string().min(1, {
    message: "Please select a target language.",
  }),
});

export function VideosDashboardClient() {
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: "1",
      title: "Introduction to Web Development",
      thumbnail: "/placeholders/thumbnail-1.jpg",
      duration: "12:34",
      uploadDate: "2023-06-15",
      language: "English",
      url: "https://example.com/video1.mp4",
    },
    {
      id: "2",
      title: "Advanced React Patterns",
      thumbnail: "/placeholders/thumbnail-2.jpg",
      duration: "23:45",
      uploadDate: "2023-07-22",
      language: "English",
      url: "https://example.com/video2.mp4",
    },
  ]);
  const [dubbingJobs, setDubbingJobs] = useState<DubbingJob[]>([
    {
      videoId: "1",
      targetLanguage: "Spanish",
      status: "completed",
      result: {
        video: {
          url: "https://example.com/video1-spanish.mp4",
        },
      },
    },
    {
      videoId: "2",
      targetLanguage: "French",
      status: "processing",
    },
  ]);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [tabValue, setTabValue] = useState("videos");
  const { submitDubbingJob } = useDubbing();

  const videoTabs = [
    { value: "videos", label: "My Videos" },
    { value: "upload", label: "Upload & Dub" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetLanguage: "",
    },
  });

  function handleUploadComplete(fileInfo: UploadcareOutput) {
    if (!fileInfo.cdnUrl || !fileInfo.name || !fileInfo.mimeType) {
      toast({
        title: "Error",
        description: "Invalid file information received.",
        variant: "destructive",
      });
      return;
    }

    // Check if file is a video
    if (!ALLOWED_VIDEO_TYPES.includes(fileInfo.mimeType)) {
      toast({
        title: "Error",
        description: "Only video files are allowed.",
        variant: "destructive",
      });
      return;
    }

    // Create a new video object
    const newVideo: VideoItem = {
      id: `${videos.length + 1}`,
      title: fileInfo.name || "Untitled Video",
      thumbnail: "/placeholders/thumbnail-default.jpg", // Default thumbnail
      duration: "00:00", // Placeholder duration
      uploadDate: new Date().toISOString().split("T")[0],
      language: "English", // Default language
      url: fileInfo.cdnUrl,
    };

    // Update videos list
    setVideos((prev) => [...prev, newVideo]);
    
    // Reset form fields
    form.reset();
    
    // Show success message
    toast({
      title: "Success",
      description: "Video uploaded successfully.",
    });
    
    // Navigate to videos list
    setTabValue("videos");
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedVideoId) {
      toast({
        title: "Error",
        description: "Please select a video first.",
        variant: "destructive",
      });
      return;
    }

    const selectedVideo = videos.find((video) => video.id === selectedVideoId);
    
    if (!selectedVideo || !selectedVideo.url) {
      toast({
        title: "Error",
        description: "Selected video not found or missing URL.",
        variant: "destructive",
      });
      return;
    }

    // Create a new dubbing job
    const newDubbingJob: DubbingJob = {
      videoId: selectedVideoId,
      targetLanguage: values.targetLanguage,
      status: "queued",
      requestId: `job-${Date.now()}`,
    };

    // Add to dubbing jobs
    setDubbingJobs((prev) => [...prev, newDubbingJob]);

    // Call the API to submit the dubbing job
    submitDubbingJob({
      videoUrl: selectedVideo.url,
      sourceLanguage: selectedVideo.language,
      targetLanguage: values.targetLanguage,
      requestId: newDubbingJob.requestId,
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Dubbing job submitted successfully.",
        });
        
        // Update job status to processing
        setDubbingJobs((prev) =>
          prev.map((job) =>
            job.requestId === newDubbingJob.requestId
              ? { ...job, status: "processing" as const }
              : job
          )
        );
      })
      .catch((error: Error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to submit dubbing job.",
          variant: "destructive",
        });
        
        // Update job status to failed
        setDubbingJobs((prev) =>
          prev.map((job) =>
            job.requestId === newDubbingJob.requestId
              ? { ...job, status: "failed" as const }
              : job
          )
        );
      });

    // Reset the form
    form.reset();
    setSelectedVideoId("");
  }

  return (
    <div className="py-6">
      <DashboardTabs 
        tabs={videoTabs} 
        defaultValue={tabValue} 
        onValueChange={setTabValue} 
        variant="full"
      />

      {tabValue === "videos" && (
        <div className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">My Videos</h2>
            <Button variant="accent" onClick={() => setTabValue("upload")}>Upload New</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="border rounded-lg overflow-hidden bg-card"
              >
                <div className="aspect-video bg-muted relative">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs z-10">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{video.title}</h3>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Uploaded: {video.uploadDate}</span>
                    <span>Language: {video.language}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="accent" size="sm" asChild>
                      <Link href={`/dashboard/videos/${video.id}`}>View</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedVideoId(video.id);
                        setTabValue("upload");
                      }}
                    >
                      Create Dub
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {videos.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  You haven&apos;t uploaded any videos yet.
                </p>
                <Button
                  variant="accent"
                  className="mt-4"
                  onClick={() => setTabValue("upload")}
                >
                  Upload Your First Video
                </Button>
              </div>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Dubbing Jobs</h2>
            {dubbingJobs.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Video
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Target Language
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {dubbingJobs.map((job) => {
                      const video = videos.find((v) => v.id === job.videoId);
                      return (
                        <tr key={`${job.videoId}-${job.targetLanguage}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {video?.title || "Unknown video"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {job.targetLanguage}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                job.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : job.status === "processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : job.status === "queued"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {job.status.charAt(0).toUpperCase() +
                                job.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {job.status === "completed" && job.result?.video.url ? (
                              <Button variant="accent" size="sm" asChild>
                                <Link href={job.result.video.url}>
                                  Download
                                </Link>
                              </Button>
                            ) : (
                              <Button size="sm" disabled={job.status !== "failed"}>
                                {job.status === "failed" ? "Retry" : "View"}
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <p className="text-muted-foreground">
                  No dubbing jobs found. Create your first dub!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {tabValue === "upload" && (
        <div className="mt-6 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Upload New Video</h2>
            <div className="w-full md:max-w-3xl">
              <div className="border rounded-lg p-6 bg-card">
                <FileUploaderRegular
                  pubkey="demopublickey"
                  onChange={handleUploadComplete}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Supported formats: MP4, MOV, AVI, WMV. Max size: 500MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Create Dubbing</h2>
            <div className="w-full md:max-w-3xl border rounded-lg p-6 bg-card">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <FormLabel>Select Video</FormLabel>
                    <Select
                      value={selectedVideoId}
                      onValueChange={setSelectedVideoId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a video" />
                      </SelectTrigger>
                      <SelectContent>
                        {videos.map((video) => (
                          <SelectItem key={video.id} value={video.id}>
                            {video.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <FormField
                    control={form.control}
                    name="targetLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select target language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="German">German</SelectItem>
                            <SelectItem value="Italian">Italian</SelectItem>
                            <SelectItem value="Portuguese">Portuguese</SelectItem>
                            <SelectItem value="Russian">Russian</SelectItem>
                            <SelectItem value="Chinese">Chinese</SelectItem>
                            <SelectItem value="Japanese">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button variant="accent" type="submit" className="w-full">
                    Create Dub
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 