"use client";

import { useState, useEffect, useCallback } from 'react';
import { submitDubbingJob, checkDubbingStatus, getDubbingResult, uploadVideoForDubbing, DubbingInput, DubbingOutput } from '@/lib/services/dubbing-service';

interface DubbingJob {
  id: string;
  videoId: string;
  targetLanguage: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  requestId?: string;
  result?: DubbingOutput;
  error?: string;
}

// For backward compatibility with the simple version
export interface DubbingSubmitParams {
  videoUrl: string;
  sourceLanguage: string;
  targetLanguage: string;
  requestId?: string;
}

export interface DubbingResult {
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
}

interface UseDubbingResult {
  jobs: DubbingJob[];
  isLoading: boolean;
  error: string | null;
  submitJob: (videoUrl: string, targetLanguage: string) => Promise<string | undefined>;
  uploadAndDub: (file: File, targetLanguage: string) => Promise<void>;
  pollJobStatus: (jobId: string) => void;
  cancelPolling: (jobId: string) => void;
  // Added for backward compatibility
  submitDubbingJob: (params: DubbingSubmitParams) => Promise<DubbingResult>;
  isSubmitting: boolean;
}

export function useDubbing(): UseDubbingResult {
  const [jobs, setJobs] = useState<DubbingJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Map to store polling intervals
  const [pollingIntervals] = useState<Map<string, NodeJS.Timeout>>(new Map());
  
  // Clean up all polling intervals on unmount
  useEffect(() => {
    return () => {
      pollingIntervals.forEach((interval) => {
        clearInterval(interval);
      });
    };
  }, [pollingIntervals]);
  
  // Function to submit a new dubbing job
  const submitJob = useCallback(async (videoUrl: string, targetLanguage: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create job input
      const input: DubbingInput = {
        video_url: videoUrl,
        target_language: targetLanguage as "hindi" | "turkish" | "english",
        do_lipsync: true
      };
      
      // Submit job to API
      const { requestId } = await submitDubbingJob(input);
      
      // Create new job in state
      const newJob: DubbingJob = {
        id: Math.random().toString(36).substring(2, 15),
        videoId: videoUrl,
        targetLanguage,
        status: 'queued',
        requestId
      };
      
      // Add to jobs list
      setJobs(prev => [...prev, newJob]);
      
      // Start polling for updates
      pollJobStatus(newJob.id);
      
      return newJob.id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error submitting dubbing job:', err);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Function to upload a file and then submit for dubbing
  const uploadAndDub = useCallback(async (file: File, targetLanguage: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Upload the file
      const videoUrl = await uploadVideoForDubbing(file);
      
      // Submit the dubbing job
      await submitJob(videoUrl, targetLanguage);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error uploading and dubbing:', err);
    } finally {
      setIsLoading(false);
    }
  }, [submitJob]);
  
  // Function to poll job status
  const pollJobStatus = useCallback((jobId: string) => {
    // Find the job
    const job = jobs.find(j => j.id === jobId);
    if (!job || !job.requestId) return;
    
    // Set up polling interval
    const intervalId = setInterval(async () => {
      try {
        // Get status from API
        const { status } = await checkDubbingStatus(job.requestId!);
        
        // Map API status to our status
        let newStatus: 'queued' | 'processing' | 'completed' | 'failed';
        switch (status) {
          case 'IN_QUEUE':
            newStatus = 'queued';
            break;
          case 'IN_PROGRESS':
            newStatus = 'processing';
            break;
          case 'COMPLETED':
            newStatus = 'completed';
            break;
          case 'FAILED':
            newStatus = 'failed';
            break;
          default:
            newStatus = 'queued';
        }
        
        // If status changed to completed, get result
        if (newStatus === 'completed') {
          const result = await getDubbingResult(job.requestId!);
          
          // Update job with result and stop polling
          setJobs(prev => prev.map(j => 
            j.id === jobId 
              ? { ...j, status: newStatus, result } 
              : j
          ));
          
          // Stop polling
          clearInterval(intervalId);
          pollingIntervals.delete(jobId);
        } else if (newStatus === 'failed') {
          // If failed, update status and stop polling
          setJobs(prev => prev.map(j => 
            j.id === jobId 
              ? { ...j, status: newStatus, error: 'Job failed' } 
              : j
          ));
          
          // Stop polling
          clearInterval(intervalId);
          pollingIntervals.delete(jobId);
        } else if (newStatus !== job.status) {
          // If status changed but not completed/failed, just update status
          setJobs(prev => prev.map(j => 
            j.id === jobId 
              ? { ...j, status: newStatus } 
              : j
          ));
        }
      } catch (err) {
        console.error(`Error polling status for job ${jobId}:`, err);
      }
    }, 5000); // Poll every 5 seconds
    
    // Store the interval
    pollingIntervals.set(jobId, intervalId);
  }, [jobs, pollingIntervals]);
  
  // Function to cancel polling for a job
  const cancelPolling = useCallback((jobId: string) => {
    const interval = pollingIntervals.get(jobId);
    if (interval) {
      clearInterval(interval);
      pollingIntervals.delete(jobId);
    }
  }, [pollingIntervals]);
  
  // For backward compatibility with the simple version
  const backwardSubmitDubbingJob = useCallback(async (params: DubbingSubmitParams): Promise<DubbingResult> => {
    setIsLoading(true);
    
    try {
      await submitJob(params.videoUrl, params.targetLanguage);
      return {
        success: true,
        id: `job-${Date.now()}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred"
      };
    } finally {
      setIsLoading(false);
    }
  }, [submitJob]);
  
  return {
    jobs,
    isLoading,
    error,
    submitJob,
    uploadAndDub,
    pollJobStatus,
    cancelPolling,
    // For backward compatibility
    submitDubbingJob: backwardSubmitDubbingJob,
    isSubmitting: isLoading
  };
} 