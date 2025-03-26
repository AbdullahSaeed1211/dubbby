'use client';

import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/app/components/dashboard/dashboard-sidebar"
import { Toaster } from 'react-hot-toast'

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  useSidebar();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b flex items-center px-4">
          <SidebarTrigger className="mr-4" />
        </div>
        <main className="flex-1 overflow-y-auto">
          <div 
            className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full max-w-6xl transition-all duration-300 ease-in-out`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
      <Toaster />
    </SidebarProvider>
  );
} 