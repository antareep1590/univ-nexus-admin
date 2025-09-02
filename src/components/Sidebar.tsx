import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  ShoppingCart, 
  CreditCard, 
  MessageSquare, 
  BarChart3, 
  Settings 
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Students", href: "/admin/students", icon: Users },
  { name: "Buyers", href: "/admin/buyers", icon: Users },
  { name: "Gigs", href: "/admin/gigs", icon: Briefcase },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Earnings & Billing", href: "/admin/earnings", icon: CreditCard },
  { name: "Disputes", href: "/admin/disputes", icon: MessageSquare },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="admin-sidebar w-64 flex-shrink-0">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--admin-sidebar-accent))] to-[hsl(var(--admin-sidebar-accent))]/80 bg-clip-text text-transparent">
          Univ Jobs
        </h2>
        <p className="text-xs text-[hsl(var(--admin-sidebar-foreground))]/60 mt-1">
          Admin Portal
        </p>
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                end={item.href === "/admin"}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}