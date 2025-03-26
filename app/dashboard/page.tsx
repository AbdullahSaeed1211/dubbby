'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart3, Crown, Globe, Languages, Sparkles, Tv, Upload, Video } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<string>("week");
  
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your activity and dubbing metrics
        </p>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 w-full">
        <Card className="w-full overflow-hidden border">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 bg-transparent">
            <CardTitle className="text-sm font-medium">
              Used Credits
            </CardTitle>
            <Languages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">100 min</div>
            <div className="text-xs text-muted-foreground">of 500 minutes this month</div>
            <Progress value={20} className="h-1 mt-3" />
          </CardContent>
        </Card>
        
        <Card className="w-full overflow-hidden border">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 bg-transparent">
            <CardTitle className="text-sm font-medium">
              Videos Dubbed
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">2</div>
            <div className="text-xs text-muted-foreground">
              +2 compared to last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full overflow-hidden border">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 bg-transparent">
            <CardTitle className="text-sm font-medium">
              Languages Used
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">2</div>
            <div className="text-xs text-muted-foreground">
              Spanish, French
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="w-full overflow-hidden border">
        <CardHeader className="p-4 pb-2 bg-transparent flex flex-row items-center justify-between">
          <div>
            <CardTitle>Activity Statistics</CardTitle>
            <CardDescription>
              Your dubbing activity over time
            </CardDescription>
          </div>
          <div className="rounded-full border p-1 flex">
            <Button 
              variant={timeRange === "week" ? "default" : "ghost"} 
              size="sm" 
              className="text-xs rounded-full h-7 px-3"
              onClick={() => setTimeRange("week")}
            >
              Week
            </Button>
            <Button 
              variant={timeRange === "month" ? "default" : "ghost"} 
              size="sm" 
              className="text-xs rounded-full h-7 px-3"
              onClick={() => setTimeRange("month")}
            >
              Month
            </Button>
            <Button 
              variant={timeRange === "year" ? "default" : "ghost"} 
              size="sm" 
              className="text-xs rounded-full h-7 px-3"
              onClick={() => setTimeRange("year")}
            >
              Year
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-6">
          <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
            <BarChart3 className="h-8 w-8 text-muted-foreground/80" />
            <span className="ml-2 text-sm text-muted-foreground">
              Activity chart will appear here
            </span>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full">
        <Card className="w-full overflow-hidden border">
          <CardHeader className="p-4 pb-2 bg-transparent">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest dubbing and upload activities
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 flex-shrink-0">
                  <Languages className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dubbed &ldquo;Marketing Campaign Explainer&rdquo; to French</p>
                  <p className="text-xs text-muted-foreground">2 hours ago • 40 credits used</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 flex-shrink-0">
                  <Languages className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dubbed &ldquo;Marketing Campaign Explainer&rdquo; to Spanish</p>
                  <p className="text-xs text-muted-foreground">2.5 hours ago • 40 credits used</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 flex-shrink-0">
                  <Video className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Uploaded &ldquo;Marketing Campaign Explainer&rdquo;</p>
                  <p className="text-xs text-muted-foreground">3 hours ago • 24.5 MB</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" asChild>
              <Link href="/dashboard/history">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="w-full overflow-hidden border">
          <CardHeader className="p-4 pb-2 bg-transparent">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to get you started
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-left h-10" asChild>
                <Link href="/dashboard/videos?tab=upload">
                  <Upload className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Upload New Video</span>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left h-10" asChild>
                <Link href="/dashboard/videos">
                  <Languages className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Create New Dubbing</span>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left h-10" asChild>
                <Link href="#">
                  <Tv className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Publish to Social Media</span>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left h-10" asChild>
                <Link href="/dashboard/settings">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Optimize Account Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-2">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" asChild>
              <Link href="/dashboard/settings?tab=billing">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Scale Plan
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 