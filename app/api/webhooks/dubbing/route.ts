import { NextRequest, NextResponse } from "next/server";
import { handleDubbingWebhook } from "@/lib/services/dubbing-service";

/**
 * API route that receives webhook callbacks from fal-ai
 * For dubbing status updates and results
 * 
 * This would be integrated with a database in a real application
 * to update job statuses and save results
 */
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const payload = await request.json();
    
    // Verify the webhook is from FAL (add verification logic here)
    // This is important for security in a real application
    // For example, you could verify a signature in the headers
    
    // Process the webhook payload
    const { requestId, status, result } = handleDubbingWebhook(payload);
    
    console.log(`Received dubbing webhook: ${requestId} - Status: ${status}`);
    
    // In a real application, you would:
    // 1. Update the job status in your database
    // 2. Save the result URL if completed
    // 3. Notify the user via real-time updates or email
    
    if (status === "COMPLETED" && result) {
      // Job completed successfully
      console.log(`Dubbing job ${requestId} completed: ${result.video.url}`);
      
      // Here you would update your database with the result
      // And trigger any notifications to the user
    } else if (status === "FAILED") {
      // Job failed
      console.error(`Dubbing job ${requestId} failed`);
      
      // Here you would update your database with the error
      // And notify the user of the failure
    }
    
    // Return a success response to fal-ai
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing dubbing webhook:", error);
    
    // Return an error response 
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
} 