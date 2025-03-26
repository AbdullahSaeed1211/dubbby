'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Home, Video, History, Settings, Crown, VideoIcon, Moon, Sun } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { useTheme } from "next-themes"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <Sidebar className="border-r px-4 pb-4">
      <div className="flex h-14 items-center justify-center border-b -mx-4 px-4 mb-4">
        <Link href="/" className="font-semibold text-lg flex items-center gap-2">
          <VideoIcon className="h-5 w-5" />
          Dubbby
        </Link>
      </div>
      <div className="space-y-1">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm font-normal",
              pathname === "/dashboard" && "bg-accent/10 text-accent hover:bg-accent/20 hover:text-accent"
            )}
          >
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/videos">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm font-normal",
              pathname === "/dashboard/videos" && "bg-accent/10 text-accent hover:bg-accent/20 hover:text-accent"
            )}
          >
            <Video className="h-4 w-4 mr-2" />
            Videos
          </Button>
        </Link>
        <Link href="/dashboard/history">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm font-normal",
              pathname === "/dashboard/history" && "bg-accent/10 text-accent hover:bg-accent/20 hover:text-accent"
            )}
          >
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm font-normal",
              pathname === "/dashboard/settings" && "bg-accent/10 text-accent hover:bg-accent/20 hover:text-accent"
            )}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </Link>
        
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-normal"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 mr-2" />
          ) : (
            <Moon className="h-4 w-4 mr-2" />
          )}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
      <div className="mt-auto pt-4">
        <div className="space-y-4 px-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium text-muted-foreground">Credits</p>
              <p className="text-[10px] tabular-nums">0/100</p>
            </div>
            <Progress value={0} className="h-1 bg-muted" />
          </div>
          <Button
            variant="premium"
            size="sm"
            className="w-full justify-center text-sm font-medium"
          >
            <Crown className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
          <div className="flex justify-center mt-4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                  userButtonBox: "flex items-center gap-2",
                  userButtonOuterIdentifier: "text-xs font-medium",
                  userButtonInnerIdentifier: "text-[10px] text-muted-foreground"
                }
              }}
              showName={true}
            />
          </div>
        </div>
      </div>
    </Sidebar>
  )
} 