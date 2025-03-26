export type TargetLanguage = 'hindi' | 'turkish' | 'english';

export interface DubbingParams {
  video_url: string;
  target_language: TargetLanguage;
  do_lipsync: boolean;
}

export const DEFAULT_PARAMS: DubbingParams = {
  video_url: '',
  target_language: 'english',
  do_lipsync: true,
};

// 100MB in bytes
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

export interface VideoUploadInfo {
  uuid: string;
  cdnUrl?: string;
}

export interface ProcessingStatus {
  status: 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED';
  request_id: string;
  response_url?: string;
  queue_position?: number;
}

export interface DubbingResult {
  video: {
    file_size: number;
    file_name: string;
    content_type: string;
    url: string;
  };
} 