import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const visualizations = [
  {
    to: "/interactive-plasma/blackhole",
    label: "Black Hole",
    description: "Schwarzschild black hole with accretion disk and gravitational lensing",
  },
  {
    to: "/interactive-plasma/heliophysics",
    label: "Heliophysics",
    description: "Solar wind and magnetospheric plasma dynamics",
  },
  {
    to: "/interactive-plasma/nuclear-fusion",
    label: "Nuclear Fusion",
    description: "Tokamak plasma confinement and fusion reactions",
  },
];

const InteractivePlasma = () => {
  return (
    <div className="flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl font-serif tracking-[0.12em] uppercase text-white mb-4"
      >
        Interactive Plasma
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs md:text-sm tracking-[0.15em] uppercase text-white/50 mb-8"
      >
        GPU-powered plasma visualizations
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-xs h-px bg-white/30 mb-8"
      />

      <div className="grid gap-5 w-full max-w-lg">
        {visualizations.map((item, i) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
          >
            <Link
              to={item.to}
              className="block border border-white/20 rounded-2xl px-8 py-5 text-left hover:bg-white/5 hover:border-white/40 transition-all duration-300 group"
            >
              <h2 className="text-sm md:text-base font-serif tracking-[0.15em] uppercase text-white/90 group-hover:text-white mb-1.5">
                {item.label}
              </h2>
              <p className="text-[11px] md:text-xs tracking-wide text-white/40 group-hover:text-white/60 transition-colors">
                {item.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InteractivePlasma;
