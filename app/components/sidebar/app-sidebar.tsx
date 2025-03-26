'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Video, CreditCard, Settings, HelpCircle, VideoIcon } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from './index';
import { Button } from "@/components/ui/button";

const mainNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'My Videos',
    href: '/videos',
    icon: Video,
  },
  {
    title: 'Subscription',
    href: '/subscription',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Help & Support',
    href: '/support',
    icon: HelpCircle,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <Link href="/dashboard" className="flex items-center gap-2">
            <VideoIcon className="h-6 w-6" />
            <span className="font-semibold">Dubbby</span>
          </Link>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <nav className="grid gap-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex w-full items-center justify-between px-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
            showName={true}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
} 