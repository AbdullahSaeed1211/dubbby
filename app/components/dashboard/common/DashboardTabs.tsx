import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface Tab {
  value: string;
  label: string;
}

export interface DashboardTabsProps {
  tabs: Tab[];
  defaultValue: string;
  onValueChange: (value: string) => void;
  className?: string;
  variant?: "full" | "boxed";
}

export function DashboardTabs({
  tabs,
  defaultValue,
  onValueChange,
  className,
  variant = "boxed",
}: DashboardTabsProps) {
  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <TabsList 
        className={cn(
          "grid w-full",
          {
            "grid-cols-2": tabs.length === 2,
            "grid-cols-3": tabs.length === 3,
            "grid-cols-4": tabs.length === 4,
            "grid-cols-5": tabs.length === 5,
            "p-1 h-10 bg-muted/30": variant === "boxed",
            "p-0 h-auto bg-transparent border-b": variant === "full"
          }
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className={cn({
              "data-[state=active]:bg-white data-[state=active]:text-accent data-[state=active]:shadow-sm": 
                variant === "boxed",
              "data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:text-accent rounded-none border-b-2 border-transparent": 
                variant === "full"
            })}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
} 