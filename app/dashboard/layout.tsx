import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/app/components/dashboard/dashboard-sidebar"
import { Toaster } from 'react-hot-toast'
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  )
} 