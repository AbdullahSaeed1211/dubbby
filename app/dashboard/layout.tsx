import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Home, 
  Video, 
  CreditCard, 
  Settings, 
  HelpCircle
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { href: "/dashboard/projects", label: "My Videos", icon: <Video className="h-5 w-5" /> },
    { href: "/dashboard/subscription", label: "Subscription", icon: <CreditCard className="h-5 w-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
    { href: "/dashboard/help", label: "Help & Support", icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-card md:flex">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2 px-2 py-4">
            <div className="rounded-full bg-primary/10 p-1">
              <img
                src={user.imageUrl || "https://github.com/shadcn.png"}
                alt={user.username || "User"}
                className="h-8 w-8 rounded-full"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-muted-foreground">{user.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
} 