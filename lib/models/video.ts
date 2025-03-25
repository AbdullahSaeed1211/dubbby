import mongoose, { Schema, Document } from 'mongoose';

export interface IVideoProcessing extends Document {
  userId: string;
  sourceVideo: {
    url: string;
    uploadcareId: string;
    cloudinaryId?: string;
    size?: number;
    format?: string;
  };
  transformedVideo?: {
    url: string;
    cloudinaryId: string;
  };
  parameters: {
    prompt: string;
    video_url: string;
    num_inference_steps?: number;
    seed?: number;
    strength?: number;
    aspect_ratio?: '16:9' | '9:16';
    resolution?: '480p' | '580p' | '720p';
    num_frames?: 85 | 129;
    pro_mode?: boolean;
    enable_safety_checker?: boolean;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const videoProcessingSchema = new Schema<IVideoProcessing>(
  {
    userId: { type: String, required: true, index: true },
    sourceVideo: {
      url: { type: String, required: true },
      uploadcareId: { type: String, required: true },
      cloudinaryId: String,
      size: Number,
      format: String,
    },
    transformedVideo: {
      url: String,
      cloudinaryId: String,
    },
    parameters: {
      prompt: { type: String, required: true },
      video_url: { type: String, required: true },
      num_inference_steps: { type: Number, default: 30 },
      seed: Number,
      strength: { type: Number, default: 0.85 },
      aspect_ratio: { type: String, enum: ['16:9', '9:16'], default: '16:9' },
      resolution: { type: String, enum: ['480p', '580p', '720p'], default: '720p' },
      num_frames: { type: Number, enum: [85, 129], default: 129 },
      pro_mode: { type: Boolean, default: false },
      enable_safety_checker: { type: Boolean, default: true },
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    error: String,
    startedAt: { type: Date, required: true },
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

export const VideoProcessing = mongoose.models.VideoProcessing || mongoose.model<IVideoProcessing>('VideoProcessing', videoProcessingSchema); 