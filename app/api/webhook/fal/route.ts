import { NextRequest, NextResponse } from 'next/server';
import { VideoProcessing } from '@/lib/models/video';
import connectDB from '@/lib/utils/mongodb';
import { uploadToCloudinary } from '@/lib/utils/video';
import { createHmac } from 'crypto';

// Webhook secret should be configured in Fal AI dashboard and stored in environment variables
const WEBHOOK_SECRET = process.env.FAL_AI_WEBHOOK_SECRET;

interface FalWebhookPayload {
  status: 'completed' | 'failed';
  request_id: string;
  error?: string;
  output?: {
    video: {
      url: string;
      content_type?: string;
      file_name?: string;
      file_size?: number;
    };
    seed?: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    // Verify webhook signature
    const signature = req.headers.get('x-fal-signature');
    const rawBody = await req.text();
    
    if (!signature || !WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hmac = createHmac('sha256', WEBHOOK_SECRET);
    const computedSignature = hmac.update(rawBody).digest('hex');
    
    if (signature !== computedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
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

    const body = JSON.parse(rawBody) as FalWebhookPayload;

    if (body.status === 'completed' && body.output?.video?.url) {
      // Upload the transformed video to Cloudinary
      const cloudinaryResult = await uploadToCloudinary(body.output.video.url);

      // Update the processing record
      await VideoProcessing.findByIdAndUpdate(processingId, {
        status: 'completed',
        transformedVideo: {
          url: cloudinaryResult.url,
          cloudinaryId: cloudinaryResult.cloudinaryId,
        },
        completedAt: new Date(),
      });

      return NextResponse.json({ status: 'success' });
    } else if (body.status === 'failed') {
      // Update the processing record with error
      await VideoProcessing.findByIdAndUpdate(processingId, {
        status: 'failed',
        error: body.error || 'Unknown error occurred',
        completedAt: new Date(),
      });

      return NextResponse.json({ status: 'error', error: body.error });
    }

    return NextResponse.json(
      { error: 'Invalid webhook payload' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to handle webhook' },
      { status: 500 }
    );
  }
} 