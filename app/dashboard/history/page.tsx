'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, HistoryIcon, Languages, TimerIcon, VideoIcon } from "lucide-react";
import { format } from "date-fns";
import { DashboardTabs } from "../../components/dashboard/common/DashboardTabs";

interface HistoryItem {
  id: number;
  type: "upload" | "dubbing";
  status: "completed" | "processing";
  videoTitle: string;
  timestamp: Date;
  duration: string;
  fileSize?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  credits?: number;
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock history data - would come from API in real app
  const historyItems: HistoryItem[] = [
    {
      id: 1,
      type: "dubbing",
      status: "completed",
      videoTitle: "Marketing Campaign Explainer",
      sourceLanguage: "English",
      targetLanguage: "Spanish",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      duration: "1:24",
      credits: 40,
    },
    {
      id: 2,
      type: "dubbing",
      status: "completed",
      videoTitle: "Marketing Campaign Explainer",
      sourceLanguage: "English",
      targetLanguage: "French",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
      duration: "1:24",
      credits: 40,
    },
    {
      id: 3,
      type: "upload",
      status: "completed",
      videoTitle: "Marketing Campaign Explainer",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      fileSize: "24.5 MB",
      duration: "1:24",
    },
  ];

  const filteredItems = activeTab === "all" 
    ? historyItems 
    : historyItems.filter(item => item.type === activeTab);

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Activity History</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your recent uploads and dubbing activities
        </p>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full space-y-4">
        <DashboardTabs 
          tabs={[
            { value: "all", label: "All Activity" },
            { value: "upload", label: "Uploads" },
            { value: "dubbing", label: "Dubbings" },
          ]}
          defaultValue="all"
          onValueChange={setActiveTab} 
          variant="full"
        />
        
        <TabsContent value="all" className="w-full space-y-4">
          <HistoryList items={filteredItems} />
        </TabsContent>
        
        <TabsContent value="upload" className="w-full space-y-4">
          <HistoryList items={filteredItems} />
        </TabsContent>
        
        <TabsContent value="dubbing" className="w-full space-y-4">
          <HistoryList items={filteredItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HistoryList({ items }: { items: HistoryItem[] }) {
  if (items.length === 0) {
    return (
      <Card className="w-full p-6 flex flex-col items-center justify-center text-center h-60">
        <HistoryIcon className="h-10 w-10 text-muted-foreground/50 mb-4" />
        <h3 className="font-medium">No activity history yet</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Your recent activity will appear here
        </p>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-4">
      {items.map(item => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function HistoryCard({ item }: { item: HistoryItem }) {
  const Icon = item.type === "upload" ? VideoIcon : Languages;
  const actionText = item.type === "upload" ? "Uploaded" : "Dubbed";
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="p-2 rounded-full bg-accent/10">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              {actionText} &ldquo;{item.videoTitle}&rdquo;
            </CardTitle>
            <Badge 
              variant={item.status === "completed" ? "success" : "default"}
              className="ml-2"
            >
              {item.status === "completed" ? (
                <span className="flex items-center">
                  <CheckIcon className="h-3 w-3 mr-1" />
                  Completed
                </span>
              ) : (
                <span className="flex items-center">
                  <TimerIcon className="h-3 w-3 mr-1" />
                  Processing
                </span>
              )}
            </Badge>
          </div>
          <CardDescription className="mt-1">
            {format(item.timestamp, "MMM d, yyyy 'at' h:mm a")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <span className="text-muted-foreground">Duration:</span>{" "}
            <span className="font-medium">{item.duration}</span>
          </div>
          
          {item.type === "upload" ? (
            <div>
              <span className="text-muted-foreground">File Size:</span>{" "}
              <span className="font-medium">{item.fileSize}</span>
            </div>
          ) : (
            <>
              <div>
                <span className="text-muted-foreground">From:</span>{" "}
                <span className="font-medium">{item.sourceLanguage}</span>
              </div>
              <div>
                <span className="text-muted-foreground">To:</span>{" "}
                <span className="font-medium">{item.targetLanguage}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Credits Used:</span>{" "}
                <span className="font-medium">{item.credits}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-end pt-2">
        <Button variant="accent" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
} 