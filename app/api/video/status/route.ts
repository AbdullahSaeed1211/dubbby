import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { VideoProcessing } from '@/lib/models/video';
import connectDB from '@/lib/utils/mongodb';
import { FilterQuery, Model } from 'mongoose';

interface IVideoTransformation {
  _id: string;
  userId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  originalVideo: {
    url: string;
    uploadcareId: string;
  };
  transformedVideo?: {
    url: string;
    cloudinaryId: string;
  };
  parameters: {
    prompt: string;
    video_url: string;
    num_inference_steps: number;
    seed: number;
    strength: number;
    aspect_ratio: '16:9' | '9:16';
    resolution: '480p' | '580p' | '720p';
    num_frames: '85' | '129';
    pro_mode: boolean;
    enable_safety_checker: boolean;
  };
  error?: string;
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const processingId = url.searchParams.get('processingId');

    if (!processingId) {
      return NextResponse.json(
        { error: 'Missing processingId parameter' },
        { status: 400 }
      );
    }

    await connectDB();

    const processing = await VideoProcessing.findOne({
      _id: processingId,
      userId,
    });

    if (!processing) {
      return NextResponse.json(
        { error: 'Processing record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: processing.status,
      sourceVideo: processing.sourceVideo,
      transformedVideo: processing.transformedVideo,
      error: processing.error,
      startedAt: processing.startedAt,
      completedAt: processing.completedAt,
    });
  } catch (error) {
    console.error('Error getting video status:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get video status' },
      { status: 500 }
    );
  }
}

// Get all transformations for the user
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();
    const { page = 1, limit = 10, status } = body;

    const query: FilterQuery<IVideoTransformation> = { userId };
    if (status) {
      query.status = status;
    }

    const VideoTransformationModel = VideoProcessing as Model<IVideoTransformation>;
    const transformations = await VideoTransformationModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await VideoTransformationModel.countDocuments(query);

    return NextResponse.json({
      transformations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error in video history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 