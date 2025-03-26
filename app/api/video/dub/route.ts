import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { auth } from "@clerk/nextjs/server";
import { DubbingParams } from "@/types/video";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { params } = body as { params: DubbingParams };

    if (!params.video_url) {
      return new NextResponse("Video URL is required", { status: 400 });
    }

    // Initialize fal client
    fal.config({
      credentials: process.env.FAL_KEY
    });

    // Submit the dubbing request
    const { request_id } = await fal.queue.submit("fal-ai/dubbing", {
      input: {
        video_url: params.video_url,
        target_language: params.target_language,
        do_lipsync: params.do_lipsync
      },
    });

    return NextResponse.json({ request_id });
  } catch (error) {
    console.error("[VIDEO_DUB]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 