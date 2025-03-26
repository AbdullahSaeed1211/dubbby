'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart3, Crown, Globe, Languages, Sparkles, Upload, Video, Clock } from "lucide-react";
import Link from "next/link";
import { DashboardTabs } from "../components/dashboard/common/DashboardTabs";

interface Language {
  code: string;
  name: string;
  available: boolean;
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<string>("week");
  
  // Mock data for available languages
  const languages: Language[] = [
    { code: "hi", name: "Hindi", available: true },
    { code: "tr", name: "Turkish", available: true },
    { code: "en", name: "English", available: true },
    { code: "es", name: "Spanish", available: false },
    { code: "fr", name: "French", available: false },
    { code: "de", name: "German", available: false },
    { code: "it", name: "Italian", available: false },
    { code: "pt", name: "Portuguese", available: false },
    { code: "ru", name: "Russian", available: false },
  ];
  
  // Filter available languages
  const availableLanguages = languages.filter(lang => lang.available);
  
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
              Active Languages
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">{availableLanguages.length}</div>
            <div className="text-xs text-muted-foreground">
              {availableLanguages.map(lang => lang.name).join(', ')}
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
          <div>
            <DashboardTabs
              tabs={[
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
                { value: "year", label: "Year" },
              ]}
              defaultValue={timeRange}
              onValueChange={setTimeRange}
              className="w-auto"
              variant="boxed"
            />
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
                <div className="p-2 rounded-full bg-accent/10 flex-shrink-0">
                  <Languages className="h-4 w-4 text-accent" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dubbed &ldquo;Marketing Campaign Explainer&rdquo; to French</p>
                  <p className="text-xs text-muted-foreground">2 hours ago • 40 credits used</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-accent/10 flex-shrink-0">
                  <Languages className="h-4 w-4 text-accent" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dubbed &ldquo;Marketing Campaign Explainer&rdquo; to Spanish</p>
                  <p className="text-xs text-muted-foreground">2.5 hours ago • 40 credits used</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-accent/10 flex-shrink-0">
                  <Video className="h-4 w-4 text-accent" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Uploaded &ldquo;Marketing Campaign Explainer&rdquo;</p>
                  <p className="text-xs text-muted-foreground">3 hours ago • 24.5 MB</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="accent" size="sm" className="w-full" asChild>
              <Link href="/dashboard/history">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <div className="grid gap-4 grid-cols-1">
          <Card className="w-full overflow-hidden border">
            <CardHeader className="p-4 pb-2 bg-transparent">
              <CardTitle>Available Languages</CardTitle>
              <CardDescription>
                Languages supported for video dubbing
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-4">
              <div className="flex flex-wrap gap-2">
                {languages.map(lang => (
                  <div 
                    key={lang.code}
                    className={`px-3 py-2 rounded-full text-xs font-medium ${
                      lang.available 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400'
                    }`}
                  >
                    {lang.name}
                    {!lang.available && (
                      <span className="ml-1 text-xs text-gray-400 dark:text-gray-500">(Coming Soon)</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
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
                    <Upload className="mr-2 h-4 w-4 text-accent" />
                    <span>Upload New Video</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start text-left h-10" asChild>
                  <Link href="/dashboard/videos?tab=dubbing">
                    <Languages className="mr-2 h-4 w-4 text-accent" />
                    <span>Create New Dubbing</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start text-left h-10" asChild>
                  <Link href="/dashboard/history">
                    <Clock className="mr-2 h-4 w-4 text-accent" />
                    <span>View Dubbing History</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start text-left h-10" asChild>
                  <Link href="/dashboard/settings">
                    <Sparkles className="mr-2 h-4 w-4 text-accent" />
                    <span>Optimize Account Settings</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-2">
              <Button variant="premium" className="w-full" asChild>
                <Link href="/dashboard/settings?tab=billing">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Scale Plan
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 