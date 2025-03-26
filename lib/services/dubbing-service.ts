import { fal } from "@fal-ai/client";

export interface DubbingInput {
  video_url: string;
  target_language: "hindi" | "turkish" | "english";
  do_lipsync?: boolean;
}

export interface DubbingOutput {
  video: {
    file_size: number;
    file_name: string;
    content_type: string;
    url: string;
  }
}

export interface DubbingJob {
  id: string;
  videoId: string;
  videoTitle: string;
  originalLanguage: string;
  targetLanguage: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  outputUrl?: string;
  duration?: string;
  errorMessage?: string;
}

// Type for log entries returned by the API
interface LogEntry {
  message: string;
  level: string;
  timestamp: string;
}

// Extended queue status response type
interface QueueStatusResponse {
  status: 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  request_id: string;
  response_url?: string;
  status_url?: string;
  cancel_url?: string;
  logs?: LogEntry[];
  metrics?: Record<string, unknown>;
  queue_position?: number;
}

/**
 * Submit a video for dubbing using the fal-ai API
 */
export async function submitDubbingJob(input: DubbingInput): Promise<{ requestId: string }> {
  try {
    // This would be the real API call in production
    const response = await fal.queue.submit("fal-ai/dubbing", {
      input: {
        video_url: input.video_url,
        target_language: input.target_language,
        do_lipsync: input.do_lipsync !== false // Default to true if not specified
      }
    });
    
    return { requestId: response.request_id };
  } catch (error) {
    console.error("Error submitting dubbing job:", error);
    throw new Error("Failed to submit dubbing job");
  }
}

/**
 * Check the status of a dubbing job
 */
export async function checkDubbingStatus(requestId: string): Promise<{ 
  status: 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  logs?: LogEntry[];
}> {
  try {
    const response = await fal.queue.status("fal-ai/dubbing", {
      requestId,
      logs: true,
    });
    
    return {
      status: response.status as 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED',
      // Type assertion with our extended type
      logs: (response as QueueStatusResponse).logs
    };
  } catch (error) {
    console.error("Error checking dubbing status:", error);
    throw new Error("Failed to check dubbing status");
  }
}

/**
 * Get the result of a completed dubbing job
 */
export async function getDubbingResult(requestId: string): Promise<DubbingOutput> {
  try {
    const response = await fal.queue.result("fal-ai/dubbing", {
      requestId
    });
    
    return response.data as DubbingOutput;
  } catch (error) {
    console.error("Error getting dubbing result:", error);
    throw new Error("Failed to get dubbing result");
  }
}

// Type for webhook payloads
interface WebhookPayload {
  requestId: string;
  status: 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  data?: DubbingOutput;
}

/**
 * Handle webhook callbacks for dubbing job status updates
 */
export function handleDubbingWebhook(payload: WebhookPayload): { 
  requestId: string; 
  status: 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  result?: DubbingOutput;
} {
  // Extract relevant information from the webhook payload
  const { requestId, status, data } = payload;
  
  return {
    requestId,
    status,
    result: status === 'COMPLETED' ? data : undefined
  };
}

/**
 * Upload a video file and get a URL that can be used for dubbing
 */
export async function uploadVideoForDubbing(file: File): Promise<string> {
  try {
    // Upload the file to FAL's storage
    const url = await fal.storage.upload(file);
    return url;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Failed to upload video");
  }
} 