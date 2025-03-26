'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroupLabel, SidebarSeparator, SidebarFooter } from "@/components/ui/sidebar"
import { VideoIcon, HomeIcon, SettingsIcon, HistoryIcon, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton, useUser } from "@clerk/nextjs"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Videos",
    href: "/dashboard/videos",
    icon: VideoIcon,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: HistoryIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <VideoIcon className="h-6 w-6" />
          <span className="font-bold text-lg">Dubbby</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <SidebarMenu>
            <SidebarGroupLabel className="text-xs font-medium">Navigation</SidebarGroupLabel>
            <SidebarSeparator />
            {sidebarNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                >
                  <Link href={item.href} className="text-sm">
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="space-y-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">Credits</span>
              <span className="text-xs font-semibold">0/100</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full w-0 bg-primary rounded-full" />
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border-purple-500/20 hover:border-purple-500/30 font-medium"
          >
            <Sparkles className="h-3 w-3 mr-2" />
            Upgrade Plan
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9"
                }
              }}
              userProfileMode="modal"
            />
            <div className="flex flex-col gap-0.5 text-left">
              <span className="text-sm font-semibold">{user?.fullName}</span>
              <span className="text-xs text-muted-foreground">Free Plan</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
} 