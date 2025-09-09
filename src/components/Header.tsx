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
      <header className="bg-gradient-to-r from-card via-card/95 to-card/90 backdrop-blur-xl border-b border-border/50 h-20 flex items-center justify-between px-8 shadow-lg">
        <div className="flex items-center flex-1 max-w-2xl mr-8">
          <div className="relative w-full">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="search"
              placeholder="Search users, gigs, orders..."
              className="pl-14 pr-6 py-4 w-full text-base border-border/40 focus:border-primary/50 bg-background/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-12 w-12 hover:bg-muted/50 hover:scale-110 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-primary to-primary/80 rounded-full text-xs text-primary-foreground flex items-center justify-center font-bold shadow-lg animate-pulse">
                  3
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-card/95 backdrop-blur-sm border shadow-lg">
              <p className="font-medium">Notifications (3 unread)</p>
            </TooltipContent>
          </Tooltip>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 hover:bg-muted/50 hover:scale-110 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
                  >
                    <User className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-card/95 backdrop-blur-sm border shadow-lg">
                  <p className="font-medium">Account menu</p>
                </TooltipContent>
              </Tooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 bg-card/95 backdrop-blur-sm border shadow-xl">
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