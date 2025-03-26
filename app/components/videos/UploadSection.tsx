'use client';

import { useState } from "react";
import { Video, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from 'next/dynamic';
import "@uploadcare/react-uploader/core.css";
import { toast } from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DubbingParams, DEFAULT_PARAMS, MAX_VIDEO_SIZE, TargetLanguage } from "@/types/video";
import type { TProps } from "@uploadcare/react-uploader";

interface UploadcareFile {
  uuid: string;
  cdnUrl?: string;
  name?: string;
  size?: number;
  mimeType?: string;
}

interface UploadcareEvent {
  status: string;
  successEntries: UploadcareFile[];
}

interface UploadcareInfo {
  status: string;
  data?: Array<{
    uuid: string | null;
    cdnUrl: string | null;
    name: string;
    size: number;
    mimeType: string;
  }>;
}

// Client-side only import of FileUploaderRegular
const FileUploaderComponent = dynamic<TProps<"Regular">>(
  () => import('@uploadcare/react-uploader').then((mod) => mod.FileUploaderRegular),
  { ssr: false }
);

export function UploadSection() {
  const [params, setParams] = useState<DubbingParams>(DEFAULT_PARAMS);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadInfo, setUploadInfo] = useState<UploadcareFile | null>(null);

  const handleUploadComplete = (event: UploadcareEvent) => {
    try {
      console.log("[UPLOAD_COMPLETE] Starting upload completion process", event);

      if (!event.successEntries?.length) {
        console.error("[UPLOAD_ERROR] No files in success entries");
        return;
      }

      const fileInfo = event.successEntries[0];
      if (!fileInfo.uuid) {
        console.error("[UPLOAD_ERROR] No UUID in file info", fileInfo);
        return;
      }

      const videoUrl = fileInfo.cdnUrl || `https://ucarecdn.com/${fileInfo.uuid}/`;
      console.log("[UPLOAD_COMPLETE] Generated video URL", videoUrl);

      setUploadInfo(fileInfo);
      setPreviewUrl(videoUrl);
      setParams({ ...params, video_url: videoUrl });

      toast.success("Video uploaded successfully");
    } catch (err) {
      console.error("[UPLOAD_ERROR]", err);
      toast.error("Upload failed. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!uploadInfo?.uuid) {
      toast.error("Please upload a video first");
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch("/api/dubbing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: uploadInfo.uuid,
          params,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      await response.json();
      toast.success("Dubbing job submitted successfully!");
      // Redirect or update UI as needed
    } catch (error) {
      console.error("[DUBBING_ERROR]", error);
      toast.error("Failed to process video. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="overflow-hidden max-w-3xl mx-auto">
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Unlock Global Audiences</h3>
            <p className="text-sm text-muted-foreground">
              Transform your video into 15+ languages with perfect lip-sync. Maximum file size: {MAX_VIDEO_SIZE}MB
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Source Video</Label>
                <FileUploaderComponent
                  pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ''}
                  onChange={(info: UploadcareInfo) => {
                    if (!info?.data?.length) {
                      console.error("[UPLOAD_ERROR] No files in upload data");
                      return;
                    }

                    const uploadEvent: UploadcareEvent = {
                      status: info.status,
                      successEntries: info.data
                        .filter((entry): entry is NonNullable<typeof entry> => entry && entry.uuid !== null)
                        .map(entry => ({
                          uuid: entry.uuid as string,
                          cdnUrl: entry.cdnUrl || undefined,
                          name: entry.name || undefined,
                          size: entry.size || undefined,
                          mimeType: entry.mimeType || undefined
                        }))
                    };

                    if (uploadEvent.successEntries.length === 0) {
                      console.error("[UPLOAD_ERROR] No valid entries after filtering");
                      return;
                    }

                    handleUploadComplete(uploadEvent);
                  }}
                  maxLocalFileSizeBytes={MAX_VIDEO_SIZE * 1024 * 1024}
                />
              </div>

              <div className="space-y-2">
                <Label>Target Language</Label>
                <Select
                  value={params.target_language}
                  onValueChange={(value: TargetLanguage) =>
                    setParams({ ...params, target_language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full justify-between"
              >
                Advanced Settings
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {showAdvanced && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Perfect Lip-Sync™</Label>
                      <p className="text-[0.8rem] text-muted-foreground">
                        Use our premium algorithm for natural-looking results that boost engagement by 40%
                      </p>
                    </div>
                    <Switch
                      checked={params.do_lipsync}
                      onCheckedChange={(checked) =>
                        setParams({ ...params, do_lipsync: checked })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {previewUrl && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <video
                  src={previewUrl}
                  controls
                  className="w-full aspect-video rounded-md border bg-black"
                />
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!uploadInfo || processing}
              className="w-full"
            >
              {processing ? (
                <span className="flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  Create Dub
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
} 