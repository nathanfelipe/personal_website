import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/cv", label: "CV" },
  { to: "/research", label: "Research" },
  { to: "/blog", label: "Bio" },
  { to: "/contact", label: "Contact" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="font-serif text-xl tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors">
            Nathan
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-xs tracking-[0.25em] uppercase transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button onClick={toggleTheme} className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground p-2" aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-md"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "text-xs tracking-[0.25em] uppercase transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-16">{children}</main>

      <footer className="border-t border-border/50 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-[0.15em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} Felipe Nathan de Oliveira Lopes</span>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/nathan-de-oliveira/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Scholar</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
