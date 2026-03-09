import PageTransition from "@/components/PageTransition";
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
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const CV = () => {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="space-y-4 mb-16">
          <p className="text-sm tracking-widest uppercase text-primary">Curriculum Vitae</p>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground">Experience</h1>
        </div>

        {/* Timeline */}
        <div className="space-y-0 mb-24">
          {experience.map((entry, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-8 border-b border-border/50"
            >
              <div className="space-y-1">
                <span className="inline-block text-xs tracking-wide font-medium bg-primary/20 text-primary px-2 py-1 rounded-sm">
                  {entry.period}
                </span>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <span className="text-primary">📍</span> {entry.location}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-serif text-foreground font-semibold">{entry.title}</h3>
                {entry.org && (
                  entry.orgLink ? (
                    <a href={entry.orgLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                      {entry.org}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{entry.org}</p>
                  )
                )}
                <ul className="space-y-1 mt-2">
                  {entry.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-muted-foreground/50 mt-0.5">◦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Links */}
        <div className="space-y-4 mb-8">
          <p className="text-sm tracking-widest uppercase text-primary">Links & Profiles</p>
          <h2 className="text-3xl font-serif text-foreground">Academic Profiles</h2>
        </div>

        <div className="grid gap-px bg-border/50 border border-border/50 rounded-sm overflow-hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-background hover:bg-secondary/50 px-8 py-5 transition-colors group"
            >
              <div className="space-y-0.5">
                <span className="text-base font-serif text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </div>
              <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default CV;
