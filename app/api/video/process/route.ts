import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import * as fal from '@fal-ai/serverless-client';
import { VideoProcessing } from '@/lib/models/video';
import connectDB from '@/lib/utils/mongodb';
import { uploadToCloudinary } from '@/lib/utils/video';

// Configure Fal AI client
fal.config({
  credentials: process.env.FAL_AI_API_KEY,
});

const processRequestSchema = z.object({
  videoUrl: z.string().url(),
  uploadcareId: z.string(),
  transformationParameters: z.object({
    prompt: z.string().min(1),
    num_inference_steps: z.number().min(10).max(50).default(30),
    seed: z.number().optional(),
    strength: z.number().min(0.1).max(1).default(0.85),
    aspect_ratio: z.enum(['16:9', '9:16']).default('16:9'),
    resolution: z.enum(['480p', '580p', '720p']).default('720p'),
    num_frames: z.enum(['85', '129']).default('129'),
    pro_mode: z.boolean().default(false),
    enable_safety_checker: z.boolean().default(true),
  }),
});

export async function POST(req: NextRequest) {
  try {
    await auth.protect();
    const { userId } = await auth();

    await connectDB();

    // Validate request body
    const body = await req.json();
    const validatedData = processRequestSchema.parse(body);

    // Upload to Cloudinary for permanent storage
    const cloudinaryResult = await uploadToCloudinary(validatedData.videoUrl);

    // Create processing record
    const processing = await VideoProcessing.create({
      userId,
      sourceVideo: {
        url: cloudinaryResult.url,
        uploadcareId: validatedData.uploadcareId,
        cloudinaryId: cloudinaryResult.cloudinaryId,
        size: cloudinaryResult.size,
        format: cloudinaryResult.format,
      },
      parameters: {
        ...validatedData.transformationParameters,
        video_url: cloudinaryResult.url,
      },
      status: 'pending',
      startedAt: new Date(),
    });

    // Get base URL for webhook
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const webhookUrl = `${baseUrl}/api/webhook/fal?processingId=${processing._id}`;

    // Submit to Fal AI
    const { request_id } = await fal.queue.submit('your-fal-model-id', {
      input: {
        ...validatedData.transformationParameters,
        video_url: cloudinaryResult.url,
      },
      webhookUrl,
    });

    return NextResponse.json({
      processingId: processing._id,
      requestId: request_id,
      status: 'pending',
    });
  } catch (error) {
    console.error('Error processing video:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process video' },
      { status: 500 }
    );
  }
} 