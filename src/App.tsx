
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { LoadingPage } from "@/components/ui/loading";
import NoraStudio from "./pages/NoraStudio";
import BookingForm from "./pages/BookingForm";
import BookingStatus from "./pages/BookingStatus";
import AdminDashboard from "./pages/AdminDashboard";
import AllWorks from "./pages/AllWorks";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "next-themes";

// Create a react-query client
const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  // Redirect to home page on hard refresh
  const ReloadToHome = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      try {
        const entries = (typeof performance !== "undefined" && (performance as any).getEntriesByType)
          ? (performance as any).getEntriesByType("navigation")
          : [];
        const isReload = (entries && entries[0]?.type === "reload") || ((performance as any)?.navigation?.type === 1);
        if (isReload && location.pathname !== "/") {
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.log("Reload redirect check failed:", err);
      }
      // run on mount only
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ReloadToHome />
            <Routes>
              <Route path="/" element={<NoraStudio />} />
              <Route path="/booking" element={<BookingForm />} />
              <Route path="/booking-status" element={<BookingStatus />} />
              <Route path="/gallery" element={<AllWorks />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
