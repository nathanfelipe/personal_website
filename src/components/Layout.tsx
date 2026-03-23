import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import backgroundImg from "@/assets/background.jpeg";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/cv", label: "CV" },
  { to: "/research", label: "Research" },
  { to: "/talks", label: "Talks" },
  { to: "/blog", label: "Bio" },
  { to: "/contact", label: "Contact" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay on the background */}
      <div className="fixed inset-0 bg-black/60 z-0" />

      {/* Header – only on inner pages */}
      {!isHome && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <NavLink to="/" className="font-serif text-lg tracking-[0.2em] uppercase text-white/90 hover:text-white transition-colors">
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
                      isActive ? "text-white" : "text-white/50 hover:text-white/80"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button onClick={toggleTheme} className="text-white/50 hover:text-white transition-colors p-1" aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </nav>

            <div className="md:hidden flex items-center gap-3">
              <button onClick={toggleTheme} className="text-white/50 hover:text-white transition-colors p-1" aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-2" aria-label="Toggle menu">
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
                className="md:hidden overflow-hidden border-t border-white/10 bg-black/80 backdrop-blur-md"
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
                          isActive ? "text-white" : "text-white/50"
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
      )}

      {/* Main content */}
      <main className="flex-1 relative z-10 flex items-center justify-center">
        {isHome ? (
          children
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-4xl mx-4 my-20 md:my-24 bg-black/65 backdrop-blur-xl border border-white/15 rounded-2xl overflow-y-auto max-h-[85vh] shadow-2xl"
          >
            {/* macOS-style red close dot */}
            <NavLink
              to="/"
              className="absolute top-4 left-4 z-20 w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer shadow-md hover:shadow-red-500/40"
              aria-label="Back to home"
            />
            {children}
          </motion.div>
        )}
      </main>

      {/* Footer – only on home */}
      {isHome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-6 left-0 right-0 z-10 text-center text-xs tracking-[0.2em] uppercase text-white/40"
        >
          © {new Date().getFullYear()} Felipe Nathan de Oliveira Lopes
        </motion.div>
      )}
    </div>
  );
};

export default Layout;
