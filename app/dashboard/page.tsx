import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.firstName || "User"}!</h1>
        <p className="text-muted-foreground">Manage your video dubbing projects from your dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Video</CardTitle>
            <CardDescription>Upload and dub a new video</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Transform your content into multiple languages with perfect lip-sync.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/create">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>View and manage your videos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access all your previous video projects and their translations.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard/projects">View Projects</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your plan</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View your current subscription details and manage your plan.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard/subscription">Manage Subscription</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 