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
    active ? "bg-primary/20 text-primary border-r-2 border-primary font-medium" : "hover:bg-muted/50 transition-colors duration-200";

  return (
    <Sidebar
      className={`border-r border-border bg-sidebar ${state === "collapsed" ? "w-16" : "w-64"}`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar border-r-0">
        {state !== "collapsed" && (
          <div className="p-6">
            <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Univ Jobs
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Admin Portal
            </p>
          </div>
        )}
        
        <SidebarGroup>
          {state !== "collapsed" && (
            <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider">
              Main Navigation
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      end={item.href === "/admin"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavCls(isActive)}`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {state !== "collapsed" && (
                        <span className="truncate text-sm">{item.name}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}