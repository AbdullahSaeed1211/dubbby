export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  uploadDate: string;
  language: string;
  url?: string;
}

export interface DubbingJob {
  videoId: string;
  targetLanguage: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  requestId?: string;
  result?: {
    video: {
      url: string;
    }
  };
}

export interface UploadcareOutput {
  cdnUrl?: string;
  name?: string;
  mimeType?: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

export interface FileValidatorResult {
  message: string;
  type: 'error' | 'warning';
} 