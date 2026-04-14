import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const visualizations = [
  {
    to: "/interactive-plasma/blackhole",
    label: "Black Hole",
    date: "Astrophysics",
    description: "Schwarzschild black hole with accretion disk and gravitational lensing",
  },
  {
    to: "/interactive-plasma/heliophysics",
    label: "Heliophysics",
    date: "Space Physics",
    description: "Solar wind and magnetospheric plasma dynamics",
  },
  {
    to: "/interactive-plasma/nuclear-fusion",
    label: "Nuclear Fusion",
    date: "Laboratory Plasma",
    description: "Tokamak plasma confinement and fusion reactions",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const InteractivePlasma = () => {
  return (
    <div className="px-8 md:px-12 py-12 md:py-16 h-full overflow-y-auto relative">
      <div className="space-y-3 mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-white/50">Interactive Plasma</p>
        <div className="w-12 h-px bg-white/30" />
        <h1 className="text-3xl md:text-4xl font-serif text-white">
          GPU-powered plasma visualizations
        </h1>
      </div>

      <div className="space-y-0 divide-y divide-white/10">
        {visualizations.map((item, i) => (
          <motion.article
            key={item.to}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="py-8 first:pt-0 last:pb-0"
          >
            <Link to={item.to} className="block max-w-2xl group">
              <div className="space-y-2">
                <time className="text-[10px] text-white/40 tracking-wide uppercase">{item.date}</time>
                <h2 className="text-xl md:text-2xl font-serif text-white group-hover:text-white/70 transition-colors">
                  {item.label}
                </h2>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default InteractivePlasma;
