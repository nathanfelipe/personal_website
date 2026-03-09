import PageTransition from "@/components/PageTransition";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-[1fr_auto] gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm tracking-widest uppercase text-primary">
                  Postdoctoral Researcher
                </p>
                <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] text-foreground">
                  Felipe Nathan<br />
                  <span className="text-muted-foreground">de Oliveira Lopes</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Postdoctoral researcher at the Centre for Mathematical Plasma Astrophysics, 
                KU Leuven, Belgium. Working at the intersection of plasma astrophysics, 
                differential geometry, and machine learning.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors rounded-sm"
                >
                  Get in touch <ArrowRight size={14} />
                </Link>
                <Link
                  to="/cv"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm tracking-wide uppercase hover:bg-secondary transition-colors rounded-sm"
                >
                  View CV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research highlight */}
      <section className="border-t border-border/50">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-sm tracking-widest uppercase text-primary mb-8">Current Research</p>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-foreground">HELIOSKILL</h2>
              <p className="text-muted-foreground leading-relaxed">
                An FWO-funded project combining physically informed machine learning with space mission data 
                and high-resolution simulations to investigate how energy is dissipated in collisionless systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our goal is to uncover the equation of state of the expanding solar wind, using machine 
                learning tools designed to extract physical insight directly from data.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-foreground">Background</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ph.D. in physics from Ruhr-Universität Bochum, M.Sc. in theoretical physics from 
                the University of Brasília, and M.Eng. in nuclear sciences from the Polytechnic 
                University of Catalonia.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Previously worked at the Max Planck Institute for Plasma Physics and the Barcelona 
                Supercomputing Center, with expertise in numerical simulations and high-performance computing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="border-t border-border/50 bg-card">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-sm tracking-widest uppercase text-primary mb-8">Beyond Research</p>
          <p className="text-xl md:text-2xl font-serif text-foreground max-w-3xl leading-relaxed">
            Guitar, oil painting, Kandinsky-esque sketches, and travelling — 34 countries and counting. 
            A language aficionado working on a 5th and 6th language. 
            <a href="https://goodreads.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> Follow my reading journey →</a>
          </p>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
