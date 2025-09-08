import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  ShoppingCart, 
  CreditCard, 
  MessageSquare, 
  BarChart3, 
  Settings,
  GraduationCap,
  User
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Students", href: "/admin/students", icon: GraduationCap },
  { name: "Buyers", href: "/admin/buyers", icon: User },
  { name: "Gigs", href: "/admin/gigs", icon: Briefcase },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Earnings & Billing", href: "/admin/earnings", icon: CreditCard },
  { name: "Disputes", href: "/admin/disputes", icon: MessageSquare },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || (path === "/admin" && currentPath === "/admin");
  const isExpanded = navigation.some((i) => isActive(i.href));

  const getNavCls = (active: boolean) =>
    active 
      ? "bg-primary/15 text-primary border border-primary/20 shadow-sm font-semibold" 
      : "hover:bg-muted/60 hover:shadow-sm hover:scale-[1.02] transition-all duration-200";

  return (
    <TooltipProvider>
      <Sidebar
        className={`border-r border-border bg-sidebar ${state === "collapsed" ? "w-16" : "w-64"} transition-all duration-300`}
        collapsible="icon"
      >
        <SidebarContent className="bg-sidebar border-r-0 p-4">
          {state !== "collapsed" && (
            <div className="px-4 py-6 mb-6">
              <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Univ Jobs
              </h2>
              <p className="text-xs text-muted-foreground mt-2">
                Admin Portal
              </p>
            </div>
          )}
          
          <SidebarGroup className="mb-8">
            {state !== "collapsed" && (
              <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider px-4 mb-4">
                Main Navigation
              </SidebarGroupLabel>
            )}
            
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      {state === "collapsed" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <NavLink
                              to={item.href}
                              end={item.href === "/admin"}
                              className={({ isActive }) =>
                                `flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 mx-auto ${getNavCls(isActive)}`
                              }
                            >
                              <item.icon className="h-6 w-6 flex-shrink-0" />
                            </NavLink>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="font-medium">
                            {item.name}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <NavLink
                          to={item.href}
                          end={item.href === "/admin"}
                          className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-base ${getNavCls(isActive)}`
                          }
                        >
                          <item.icon className="h-6 w-6 flex-shrink-0" />
                          <span className="truncate font-medium">{item.name}</span>
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
}