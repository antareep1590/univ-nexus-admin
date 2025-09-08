import { Search, Bell, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  return (
    <TooltipProvider>
      <header className="bg-card/50 backdrop-blur-sm border-b border-border h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center flex-1 max-w-lg mr-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="search"
              placeholder="Search users, gigs, orders..."
              className="pl-12 pr-4 py-3 w-full text-base border-muted/40 focus:border-primary/40 bg-background/60"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-11 w-11 hover:bg-muted/60 hover:scale-105 transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-xs text-primary-foreground flex items-center justify-center font-medium shadow-sm">
                  3
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications (3 unread)</p>
            </TooltipContent>
          </Tooltip>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-11 w-11 hover:bg-muted/60 hover:scale-105 transition-all duration-200"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Account menu</p>
                </TooltipContent>
              </Tooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <NavLink to="/admin/profile" className="flex items-center">
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
}