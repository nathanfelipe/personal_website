import PageTransition from "@/components/PageTransition";
import { ExternalLink } from "lucide-react";

const links = [
  { label: "GitHub", url: "https://github.com", description: "Code repositories & projects" },
  { label: "Google Scholar", url: "https://scholar.google.com", description: "Publication metrics & citations" },
  { label: "ORCID", url: "https://orcid.org", description: "Researcher identifier" },
  { label: "ResearchGate", url: "https://researchgate.net", description: "Research network profile" },
  { label: "ResearcherID", url: "#", description: "Web of Science profile" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/nathan-de-oliveira/", description: "Professional network" },
  { label: "Curriculum Vitae", url: "#", description: "Download full CV (PDF)" },
];

const CV = () => {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="space-y-4 mb-16">
          <p className="text-sm tracking-widest uppercase text-primary">Curriculum Vitae</p>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground">Links & Profiles</h1>
          <p className="text-muted-foreground max-w-lg">
            Find my academic profiles, publications, and downloadable CV below.
          </p>
        </div>

        <div className="grid gap-px bg-border/50 border border-border/50 rounded-sm overflow-hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-background hover:bg-secondary/50 px-8 py-6 transition-colors group"
            >
              <div className="space-y-1">
                <span className="text-lg font-serif text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
              <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default CV;
