import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/admin/SignIn";
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import StudentProfile from "./pages/admin/StudentProfile";
import Buyers from "./pages/admin/Buyers";
import BuyerProfile from "./pages/admin/BuyerProfile";
import Profile from "./pages/admin/Profile";
import Gigs from "./pages/admin/Gigs";
import GigDetails from "./pages/admin/GigDetails";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import Earnings from "./pages/admin/Earnings";
import Disputes from "./pages/admin/Disputes";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import IssueRefund from "./pages/admin/IssueRefund";
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
          <Route path="/admin/students" element={<AdminLayout><Students /></AdminLayout>} />
          <Route path="/admin/students/:id" element={<AdminLayout><StudentProfile /></AdminLayout>} />
          <Route path="/admin/buyers" element={<AdminLayout><Buyers /></AdminLayout>} />
          <Route path="/admin/buyers/:id" element={<AdminLayout><BuyerProfile /></AdminLayout>} />
          <Route path="/admin/profile" element={<AdminLayout><Profile /></AdminLayout>} />
          <Route path="/admin/gigs" element={<AdminLayout><Gigs /></AdminLayout>} />
          <Route path="/admin/gigs/:id" element={<AdminLayout><GigDetails /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><Orders /></AdminLayout>} />
          <Route path="/admin/orders/:id" element={<AdminLayout><OrderDetails /></AdminLayout>} />
          <Route path="/admin/earnings" element={<AdminLayout><Earnings /></AdminLayout>} />
          <Route path="/admin/disputes" element={<AdminLayout><Disputes /></AdminLayout>} />
          <Route path="/admin/analytics" element={<AdminLayout><Analytics /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />
          <Route path="/admin/refund" element={<AdminLayout><IssueRefund /></AdminLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
