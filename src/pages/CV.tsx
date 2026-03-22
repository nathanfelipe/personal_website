import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const experience = [
  {
    period: "2024 – Present",
    location: "Leuven, Belgium",
    title: "Postdoctoral Researcher",
    org: "KU Leuven",
    orgLink: "https://www.kuleuven.be",
    items: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    period: "2017 – 2024",
    location: "Germany",
    title: "Research Experience",
    org: "Max-Planck-Institut für Plasmaphysik (IPP)",
    items: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    period: "2016 – 2017",
    location: "Spain",
    title: "Research Experience",
    org: "Barcelona Supercomputing Center",
    items: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    period: "2014 – 2015",
    location: "Brazil",
    title: "Research Experience",
    org: "University of Brasília Plasma Physics Laboratory",
    items: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    period: "2011 – 2012",
    location: "Brazil",
    title: "Research Experience",
    org: "Brazilian Space Agency",
    items: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
];

const links = [
  { label: "GitHub", url: "https://github.com/nathanfelipe", description: "Code repositories & projects" },
  { label: "Google Scholar", url: "https://scholar.google.es/citations?user=VXjKX2kAAAAJ&hl=en", description: "Publication metrics & citations" },
  { label: "ORCID", url: "https://orcid.org/0000-0002-1290-2621", description: "Researcher identifier" },
  { label: "ResearchGate", url: "https://www.researchgate.net/profile/Felipe-Nathan-De-Oliveira", description: "Research network profile" },
  { label: "Web of Science", url: "https://www.webofscience.com/wos/author/record/E-9258-2016", description: "Web of Science profile" },
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
