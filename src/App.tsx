import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import CV from "./pages/CV";
import Research from "./pages/Research";
import Blog from "./pages/Blog";
import Talks from "./pages/Talks";
import Contact from "./pages/Contact";
import BlackHole from "./pages/BlackHole";
import InteractivePlasma from "./pages/InteractivePlasma";
import VisitedCountries from "./pages/VisitedCountries";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/research" element={<Research />} />
              <Route path="/talks" element={<Talks />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/interactive-plasma" element={<InteractivePlasma />} />
              <Route path="/interactive-plasma/blackhole" element={<BlackHole />} />
              <Route path="/visited-countries" element={<VisitedCountries />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
