'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Languages, VideoIcon, Info, Globe } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function VideosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'myvideos';
  
  // State for file uploads
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Mock function to handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Mock function to handle upload
  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setSelectedFile(null);
      // Change tab after upload
      router.push('/dashboard/videos?tab=myvideos');
    }, 2000);
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Video Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload, dub, and manage your videos in multiple languages
        </p>
      </div>
      
      <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Videos uploaded here can be dubbed into 15+ languages with perfect lip-sync. Upload once, reach global audiences!
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue={defaultTab} className="w-full space-y-4">
        <TabsList className="w-full border-b rounded-none p-0 h-10">
          <TabsTrigger 
            value="myvideos" 
            onClick={() => router.push('/dashboard/videos?tab=myvideos')}
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent rounded-none px-4 h-10"
          >
            My Videos
          </TabsTrigger>
          <TabsTrigger 
            value="upload" 
            onClick={() => router.push('/dashboard/videos?tab=upload')}
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent rounded-none px-4 h-10"
          >
            Upload New
          </TabsTrigger>
          <TabsTrigger 
            value="dubbed" 
            onClick={() => router.push('/dashboard/videos?tab=dubbed')}
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent rounded-none px-4 h-10"
          >
            Dubbed Videos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="myvideos" className="w-full space-y-4">
          <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Empty state for videos */}
            {Array.from({ length: 0 }).length === 0 ? (
              <Card className="w-full p-6 col-span-full flex flex-col items-center justify-center text-center h-60 border-dashed border-2">
                <VideoIcon className="h-10 w-10 text-muted-foreground/50 mb-4" />
                <h3 className="font-medium">No videos uploaded yet</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Upload your first video to get started with global dubbing
                </p>
                <Button 
                  onClick={() => router.push('/dashboard/videos?tab=upload')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload First Video
                </Button>
              </Card>
            ) : (
              // Video grid will appear here once videos are uploaded
              <></>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="upload" className="w-full space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Upload New Video</CardTitle>
              <CardDescription>
                Upload videos to dub into 15+ languages with perfect lip-sync technology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="title">Video Title</Label>
                  <Input id="title" placeholder="Enter a title for your video" />
                </div>
                
                <div>
                  <Label>Original Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="ko">Korean</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
                
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input id="description" placeholder="Add a description for your video" />
              </div>
              
              <div className="space-y-2">
                <Label>Upload Video File</Label>
                <div className="text-xs text-muted-foreground flex items-center mb-2">
                  <Info className="h-3 w-3 mr-1" />
                  For best results, upload videos with clear speech and minimal background noise
                </div>
                {selectedFile ? (
                  <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setSelectedFile(null)}>
                        Remove
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                        onClick={handleUpload}
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Upload & Proceed'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => document.getElementById('file-upload')?.click()}>
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">MP4, MOV or WebM (Max 500MB)</p>
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="hidden" 
                      accept="video/mp4,video/quicktime,video/webm"
                      onChange={handleFileSelect}
                    />
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Select File
                    </Button>
                  </div>
                )}
              </div>
              
              {!selectedFile && (
                <div className="mt-6 flex justify-between items-center p-4 border rounded-md bg-muted/20">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium">Ready to go global?</h4>
                      <p className="text-xs text-muted-foreground">After uploading, you&apos;ll be able to dub your video into 15+ languages</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    Learn More
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dubbed" className="w-full space-y-4">
          <Card className="w-full p-6 flex flex-col items-center justify-center text-center h-60 border-dashed border-2">
            <Languages className="h-10 w-10 text-muted-foreground/50 mb-4" />
            <h3 className="font-medium">No dubbed videos yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Upload a video and select languages to create dubbed versions
            </p>
            <Button 
              onClick={() => router.push('/dashboard/videos?tab=upload')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Video to Dub
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 