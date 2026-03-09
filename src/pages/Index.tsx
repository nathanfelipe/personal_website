import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profileImg from "@/assets/profile.jpg";

const navOptions = [
  { to: "/cv", label: "CV" },
  { to: "/research", label: "Current Research" },
  { to: "/blog", label: "Bio" },
  { to: "/contact", label: "Contact" },
];

const Index = () => {
  return (
    <div className="flex flex-col items-center text-center px-6 max-w-3xl">
      {/* Circular profile photo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
          <img
            src={profileImg}
            alt="Felipe Nathan de Oliveira Lopes"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-md h-px bg-white/30 mb-8"
      />

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-2xl md:text-4xl font-serif tracking-[0.12em] uppercase text-white mb-5"
      >
        Felipe (Nathan) de Oliveira Lopes
      </motion.h1>

      {/* Tagline 1 – position */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/70 mb-3"
      >
        Postdoctoral Researcher in Plasma Astrophysics · KU Leuven
      </motion.p>

      {/* Tagline 2 */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/55 mb-10"
      >
        Amateur philosopher, guitarist, nomad
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="w-full max-w-md h-px bg-white/30 mb-10"
      />

      {/* Navigation options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="flex flex-wrap justify-center gap-0"
      >
        {navOptions.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="border border-white/30 px-5 md:px-8 py-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            {item.label}
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default Index;
