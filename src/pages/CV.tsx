import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const experience = [
  {
    period: "2024 – 2026",
    location: "Leuven, Belgium",
    title: "co-PI of FWO project Helioskill",
    org: "KU Leuven",
    items: [
      "Fully kinetic Particle in cell simulations",
      "Working with solar wind in-situ data",
      "Symbolic regression for equation of state for plasma",
    ],
  },
  {
    period: "2024 – 2026",
    location: "Leuven, Belgium",
    title: "Project manager of ASAP",
    org: "KU Leuven",
    items: [
      "Development of algorithms for space-resilient hardware testbed",
      "Management of the consortium including KU Leuven, INAF Rome, KTH, IngeniArs, UNICAL",
    ],
  },
  {
    period: "2024 – 2026",
    location: "Leuven, Belgium",
    title: "Marie Skłodowska-Curie fellow",
    org: "KU Leuven",
    orgLink: "https://www.kuleuven.be",
    items: [
      "Project STRIDE - Moment closure through equation discovery and deep learning",
      "Advising one master thesis and 2 master projects.",
    ],
  },
  {
    period: "2023 – 2024",
    location: "Leuven, Belgium",
    title: "Postdoctoral fellow",
    org: "KU Leuven",
    orgLink: "https://www.kuleuven.be",
    items: [
      "Predicting space weather events, solar activity, ionosphere etc",
    ],
  },
  {
    period: "2010 – 2023",
    location: "USA, Belgium, Georgia",
    title: "Teaching",
    items: [
      "co-supervised Philippine Rouby-Poizat's MSc thesis at ENS-Lyon 2021",
      "supervised Remy Smets' MSc thesis at KU Leuven 2024",
      "co-supervised Jan Van Rompaeay's MSc thesis at KU Leuven 2024",
      "supervising Luka Vranckx's MSc thesis at KU Leuven 2025",
    ],
  },
];

const links = [
  { label: "GitHub", url: "https://github.com", description: "Code repositories & projects" },
  { label: "Google Scholar", url: "https://scholar.google.com", description: "Publication metrics & citations" },
  { label: "ORCID", url: "https://orcid.org", description: "Researcher identifier" },
  { label: "ResearchGate", url: "https://researchgate.net", description: "Research network profile" },
  { label: "ResearcherID", url: "#", description: "Web of Science profile" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/nathan-de-oliveira/", description: "Professional network" },
  { label: "Download Full CV (PDF)", url: "#", description: "Complete curriculum vitae" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

const CV = () => {
  return (
    <div className="px-8 md:px-12 py-12 md:py-16">
      {/* Header */}
      <div className="space-y-3 mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-white/50">Curriculum Vitae</p>
        <div className="w-12 h-px bg-white/30" />
        <h1 className="text-3xl md:text-4xl font-serif text-white">Experience</h1>
      </div>

      {/* Timeline */}
      <div className="space-y-0 mb-16">
        {experience.map((entry, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-6 py-6 border-b border-white/10"
          >
            <div className="space-y-1">
              <span className="inline-block text-[10px] tracking-wide font-medium bg-white/10 text-white/70 px-2 py-0.5 rounded-sm">
                {entry.period}
              </span>
              <p className="text-xs text-white/40">{entry.location}</p>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-serif text-white font-semibold">{entry.title}</h3>
              {entry.org && (
                entry.orgLink ? (
                  <a href={entry.orgLink} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/80 hover:underline transition-colors">
                    {entry.org}
                  </a>
                ) : (
                  <p className="text-xs text-white/40">{entry.org}</p>
                )
              )}
              <ul className="space-y-1 mt-1">
                {entry.items.map((item, j) => (
                  <li key={j} className="text-sm text-white/60 flex gap-2">
                    <span className="text-white/30 mt-0.5">◦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Links */}
      <div className="space-y-3 mb-6">
        <p className="text-xs tracking-[0.3em] uppercase text-white/50">Links & Profiles</p>
        <div className="w-12 h-px bg-white/30" />
        <h2 className="text-2xl font-serif text-white">Academic Profiles</h2>
      </div>

      <div className="grid gap-px bg-white/5 border border-white/10 rounded-sm overflow-hidden">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-black/40 hover:bg-white/5 px-6 py-4 transition-colors group"
          >
            <div className="space-y-0.5">
              <span className="text-sm font-serif text-white group-hover:text-white/90 transition-colors">
                {link.label}
              </span>
              <p className="text-[10px] text-white/40">{link.description}</p>
            </div>
            <ExternalLink size={12} className="text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default CV;
