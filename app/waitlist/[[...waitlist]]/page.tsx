import { Waitlist } from '@clerk/nextjs';

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Join the Dubbby Waitlist
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Be among the first to try our AI-powered video dubbing and lip sync technology
          </p>
        </div>
        <Waitlist />
      </div>
    </div>
  );
} 