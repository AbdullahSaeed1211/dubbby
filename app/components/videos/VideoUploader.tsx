'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";

// Schema for video transformation parameters
const transformationSchema = z.object({
  prompt: z.string().optional(),
  target_language: z.enum(['hindi', 'turkish', 'english']).default('english'),
  do_lipsync: z.boolean().default(true),
});

type TransformationInput = z.infer<typeof transformationSchema>;

export function VideoUploader() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadInfo, setUploadInfo] = useState<{ uuid: string; url: string } | null>(null);
  const [uploaderInitialized, setUploaderInitialized] = useState(false);

  const form = useForm<TransformationInput>({
    resolver: zodResolver(transformationSchema),
    defaultValues: {
      target_language: 'english',
      do_lipsync: true,
    },
  });

  // Initialize the Uploadcare uploader
  useEffect(() => {
    if (typeof window !== 'undefined' && !uploaderInitialized) {
      // Load the Uploadcare script
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@uploadcare/file-uploader@v0.12.2/dist/uploadcare.min.js';
      script.async = true;
      
      script.onload = () => {
        // Safe access to the uploadcare global
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uploadcare = (window as any).uploadcare;
        
        if (uploadcare) {
          // Create the uploader instance
          const uploader = uploadcare.createFileUploader({
            pubkey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!,
            container: '#uploader-container',
            previewType: 'inline',
            previewInformation: { caption: true, size: true },
            preferredType: 'video',
            validators: [
              {
                name: 'fileType',
                params: ["video/mp4", "video/x-m4v", "video/*", "video/mov", "video/avi", "video/wmv"]
              },
              {
                name: 'maxSize',
                params: [100 * 1024 * 1024], // 100MB max
              }
            ],
            showCompactView: true,
            locale: {
              buttons: {
                chooseFiles: 'Upload Video',
              },
              captions: {
                uploadSuccess: 'Video uploaded successfully'
              }
            }
          });
          
          // Handle upload success
          uploader.on('upload-success', (event: { detail: { uuid: string } }) => {
            setIsUploading(false);
            setUploadInfo({
              uuid: event.detail.uuid,
              url: `https://ucarecdn.com/${event.detail.uuid}/`,
            });
            toast.success('Video uploaded successfully');
          });
          
          // Handle upload start
          uploader.on('upload-start', () => {
            setIsUploading(true);
          });
          
          // Handle upload errors
          uploader.on('upload-error', (error: { detail: { message?: string } }) => {
            setIsUploading(false);
            toast.error(`Upload error: ${error.detail.message || 'Unknown error'}`);
          });
          
          setUploaderInitialized(true);
        }
      };
      
      document.body.appendChild(script);
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [uploaderInitialized]);

  // Handle form submission
  const onSubmit = async (data: TransformationInput) => {
    if (!uploadInfo) {
      toast.error('Please upload a video first');
      return;
    }

    try {
      const response = await fetch('/api/video/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoUrl: uploadInfo.url,
          uploadcareId: uploadInfo.uuid,
          transformationParameters: {
            video_url: uploadInfo.url, // Required parameter for Fal AI
            target_language: data.target_language,
            do_lipsync: data.do_lipsync,
            prompt: data.prompt, // Custom prompt parameter for potential future use
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process video');
      }

      const result = await response.json();
      toast.success('Video processing started');
      router.push(`/video/${result.processingId}`);
    } catch (error) {
      console.error('Error processing video:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process video');
    }
  };

  return (
    <Card className="w-full border-none shadow-md">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl">Transform Your Video</CardTitle>
        <CardDescription>
          Upload your video and customize your dubbing settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col space-y-2">
            <Label className="text-base font-medium">Upload Your Video</Label>
            <div className="flex items-center justify-center w-full p-6 border-2 border-dashed rounded-lg border-muted hover:border-primary/50 transition-colors">
              <div id="uploader-container" className="w-full min-h-[120px] flex items-center justify-center">
                {!uploaderInitialized && (
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Upload className="h-8 w-8" />
                    <p>Loading uploader...</p>
                  </div>
                )}
              </div>
            </div>
            {isUploading && (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm text-muted-foreground">Uploading video...</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Max file size: 100MB. Supported formats: MP4, MOV, AVI, WMV
            </p>
          </div>

          {uploadInfo && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="target_language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Target Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="turkish">Turkish</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the language your video will be dubbed to
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="do_lipsync"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base font-medium">Lip Sync</FormLabel>
                        <FormDescription>
                          Synchronize lip movements with the dubbed audio
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Custom Prompt (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Add specific instructions for the model..."
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>
                        Add specific instructions to customize the dubbing process
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Process Video'
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 