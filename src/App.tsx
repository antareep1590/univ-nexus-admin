import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/admin/SignIn";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import { AdminLayout } from "./components/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />
          <Route path="/admin/gigs" element={<AdminLayout><div className="p-8 text-center text-muted-foreground">Gig Management - Coming Soon</div></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><div className="p-8 text-center text-muted-foreground">Order Management - Coming Soon</div></AdminLayout>} />
          <Route path="/admin/earnings" element={<AdminLayout><div className="p-8 text-center text-muted-foreground">Earnings & Billing - Coming Soon</div></AdminLayout>} />
          <Route path="/admin/disputes" element={<AdminLayout><div className="p-8 text-center text-muted-foreground">Disputes Center - Coming Soon</div></AdminLayout>} />
          <Route path="/admin/analytics" element={<AdminLayout><div className="p-8 text-center text-muted-foreground">Analytics & Reporting - Coming Soon</div></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><div className="p-8 text-center text-muted-foreground">Platform Settings - Coming Soon</div></AdminLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
