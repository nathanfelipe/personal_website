import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profileImg from "@/assets/profile.jpg";
import backgroundImg from "@/assets/background.jpeg";

const navOptions = [
  { to: "/cv", label: "CV" },
  { to: "/research", label: "Current Research" },
  { to: "/blog", label: "Bio" },
  { to: "/contact", label: "Contact" },
];

const Index = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Circular profile photo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
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
          className="w-full max-w-lg h-px bg-white/30 mb-10"
        />

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-6xl font-serif tracking-[0.15em] uppercase text-white mb-6"
        >
          Felipe Nathan
        </motion.h1>

        {/* Taglines */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm md:text-base tracking-[0.25em] uppercase text-white/80 mb-4"
        >
          A Postdoctoral Researcher in Plasma Astrophysics at KU Leuven.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm md:text-base tracking-[0.25em] uppercase text-white/70 mb-4"
        >
          An oil painter and guitar enthusiast.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/60 mb-12"
        >
          34 countries and counting. Working on a 5th and 6th language.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-full max-w-lg h-px bg-white/30 mb-16"
        />

        {/* Navigation options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap justify-center gap-0"
        >
          {navOptions.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="border border-white/30 px-6 md:px-10 py-4 text-xs md:text-sm tracking-[0.3em] uppercase text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-6 z-10 text-xs tracking-[0.2em] uppercase text-white/40"
      >
        © {new Date().getFullYear()} Felipe Nathan de Oliveira Lopes
      </motion.div>
    </div>
  );
};

export default Index;
