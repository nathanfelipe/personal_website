import PageTransition from "@/components/PageTransition";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <PageTransition>
      {/* Hero — centered, minimal */}
      <section className="min-h-[85vh] flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-10">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] text-foreground tracking-tight">
              Felipe Nathan<br />
              <span className="text-muted-foreground">de Oliveira Lopes</span>
            </h1>
            <div className="w-16 h-px bg-primary mx-auto" />
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Postdoctoral Researcher in Plasma Astrophysics
            </p>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              KU Leuven, Belgium
            </p>
          </div>

          <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Working at the intersection of plasma astrophysics, 
            applied differential geometry, and machine learning.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
            >
              Get in touch <ArrowRight size={12} />
            </Link>
            <Link
              to="/cv"
              className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-secondary transition-colors"
            >
              View CV
            </Link>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="border-t border-border/50">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-12 text-center">Current Research</p>
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-serif text-foreground">HELIOSKILL</h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                An FWO-funded project combining physically informed machine learning with space mission data 
                and high-resolution simulations to investigate how energy is dissipated in collisionless systems.
              </p>
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-serif text-foreground">Background</h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Ph.D. in physics from Ruhr-Universität Bochum. M.Sc. in theoretical physics from 
                the University of Brasília. M.Eng. in nuclear sciences from the Polytechnic 
                University of Catalonia. Previously at Max Planck Institute for Plasma Physics and 
                Barcelona Supercomputing Center.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="border-t border-border/50">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-8">Beyond Research</p>
          <p className="text-xl font-serif text-foreground max-w-xl mx-auto leading-relaxed">
            Guitar, oil painting, Kandinsky-esque sketches, and travelling — 34 countries and counting. 
            A language aficionado working on a 5th and 6th language.
          </p>
          <a href="https://goodreads.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-xs tracking-[0.2em] uppercase text-primary hover:underline">
            Follow my reading journey →
          </a>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
