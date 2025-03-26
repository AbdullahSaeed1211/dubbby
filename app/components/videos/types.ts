// Common video component types
export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  uploadDate: string;
  language: string;
  url?: string;
}

export interface VideoUploadProps {
  onUploadComplete?: (videoInfo: VideoUploadResult) => void;
  maxFileSize?: number;
  allowedFormats?: string[];
}

export interface VideoUploadResult {
  url: string;
  filename: string;
  fileType: string;
  fileSize: number;
  duration?: string;
}

export interface UploadcareOutput {
  cdnUrl?: string;
  name?: string;
  mimeType?: string;
  [key: string]: string | number | boolean | object | null | undefined;
} 