'use client';

import { useState } from "react";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BellIcon, CreditCard, LogOut, Moon, Sun } from "lucide-react";
import { UserProfile } from "@clerk/nextjs";
import { DashboardTabs } from "../../components/dashboard/common/DashboardTabs";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [showClerkProfile, setShowClerkProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  
  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    name: "Alex Johnson",
    email: "alex@example.com",
    company: "Content Creators Inc.",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, this would update the user's profile
    console.log(data);
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs value={activeTab} className="w-full space-y-4">
        <DashboardTabs 
          tabs={[
            { value: "account", label: "Account" },
            { value: "billing", label: "Billing" },
            { value: "preferences", label: "Preferences" },
          ]}
          defaultValue={activeTab}
          onValueChange={setActiveTab} 
          variant="full"
        />
        
        <TabsContent value="account" className="w-full space-y-4">
          {showClerkProfile ? (
            <div className="w-full border rounded-lg p-4">
              <UserProfile />
            </div>
          ) : (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and public profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button variant="premium" type="submit">
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={() => setShowClerkProfile(true)}>
                  Advanced Profile Settings
                </Button>
                <Button variant="outline" className="text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="billing" className="w-full space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Growth Plan
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-premium-light to-premium-dark px-3 py-1 rounded-full text-white text-xs font-medium">
                    Active
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Price</span>
                    <span className="font-medium">$49.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Renewal Date</span>
                    <span className="font-medium">October 21, 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Credits</span>
                    <span className="font-medium">500 minutes/month</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="accent" className="flex-1">Change Plan</Button>
                <Button variant="outline" className="flex-1 text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10">Cancel Plan</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Update your billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-black/10">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <Button variant="outline" className="w-full">Add Payment Method</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="w-full space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the application appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Theme Preference</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose between light and dark mode
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`flex-1 py-6 ${theme === 'light' ? 'border-accent text-accent ring-2 ring-accent/10' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="h-5 w-5 mr-2" />
                    Light
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`flex-1 py-6 ${theme === 'dark' ? 'border-accent text-accent ring-2 ring-accent/10' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="h-5 w-5 mr-2" />
                    Dark
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`flex-1 py-6 ${theme === 'system' ? 'border-accent text-accent ring-2 ring-accent/10' : ''}`}
                    onClick={() => setTheme('system')}
                  >
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Language and Region</CardTitle>
              <CardDescription>
                Configure your language and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Interface Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region">Default Region</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about your dubbing jobs via email
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive news, updates, and promotional offers
                  </p>
                </div>
                <Switch id="marketing-emails" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="browser-notifications">Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show notifications in your browser when dubbing is complete
                  </p>
                </div>
                <Switch id="browser-notifications" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="premium">
                <BellIcon className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 