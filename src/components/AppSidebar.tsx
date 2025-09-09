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
      ? "bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 text-primary border border-primary/30 shadow-primary/20 font-bold backdrop-blur-sm" 
      : "hover:bg-gradient-to-r hover:from-muted/40 hover:to-muted/20 hover:shadow-lg hover:shadow-muted/20 transition-all duration-300 text-muted-foreground hover:text-foreground backdrop-blur-sm";

  return (
    <TooltipProvider>
      <Sidebar
        className={`border-r-0 bg-gradient-to-b from-card to-card/50 backdrop-blur-xl ${
          state === "collapsed" ? "w-20" : "w-72"
        } transition-all duration-500 ease-in-out shadow-2xl`}
        collapsible="icon"
      >
        <SidebarContent className="bg-transparent border-r-0 p-6">
          {state !== "collapsed" && (
            <div className="px-6 py-8 mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent drop-shadow-sm">
                Univ Jobs
              </h2>
              <p className="text-sm text-muted-foreground/80 mt-3 font-medium tracking-wide">
                ADMIN PORTAL
              </p>
            </div>
          )}
          
          <SidebarGroup className="mb-10">
            {state !== "collapsed" && (
              <SidebarGroupLabel className="text-muted-foreground/70 text-xs uppercase tracking-[0.2em] px-6 mb-6 font-semibold border-b border-border/30 pb-3">
                Main Navigation
              </SidebarGroupLabel>
            )}
            
            <SidebarGroupContent>
              <SidebarMenu className="space-y-3 px-3">
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild className="h-auto">
                      {state === "collapsed" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <NavLink
                              to={item.href}
                              end={item.href === "/admin"}
                              className={({ isActive }) =>
                                `flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 mx-auto shadow-lg hover:shadow-xl hover:scale-105 ${getNavCls(isActive)}`
                              }
                            >
                              <item.icon className="h-7 w-7 flex-shrink-0" />
                            </NavLink>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="font-semibold text-sm bg-card/95 backdrop-blur-sm border shadow-lg">
                            {item.name}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <NavLink
                          to={item.href}
                          end={item.href === "/admin"}
                          className={({ isActive }) =>
                            `flex items-center gap-5 px-6 py-4 rounded-xl transition-all duration-300 text-base font-medium min-h-[3.5rem] shadow-sm hover:shadow-md hover:scale-[1.02] ${getNavCls(isActive)}`
                          }
                        >
                          <item.icon className="h-6 w-6 flex-shrink-0" />
                          <span className="truncate tracking-wide">{item.name}</span>
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