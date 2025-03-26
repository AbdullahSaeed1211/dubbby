import { Suspense } from "react";
import { VideosDashboardClient } from "@/app/components/dashboard/videos";

/**
 * @todo Update to use centralized component when migration is complete:
 * import { VideosDashboardClient } from "@/components/dashboard/videos/VideosDashboardClient";
 */

export default function VideosDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideosDashboardClient />
    </Suspense>
  );
} 