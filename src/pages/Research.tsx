import PageTransition from "@/components/PageTransition";

const Research = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="space-y-4 mb-16">
          <p className="text-sm tracking-widest uppercase text-primary">Current Research</p>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground">HELIOSKILL</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            An FWO-funded project combining physically informed machine learning with space mission data 
            and high-resolution simulations to investigate how energy is dissipated in collisionless systems.
          </p>
        </div>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">Focus Areas</h2>
            <ul className="space-y-3 text-muted-foreground leading-relaxed">
              <li className="flex gap-3">
                <span className="text-primary mt-1">◦</span>
                <span>Fully kinetic particle-in-cell simulations</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">◦</span>
                <span>Working with solar wind in-situ data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">◦</span>
                <span>Symbolic regression for equation of state for plasma</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">Background</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ph.D. in physics from Ruhr-Universität Bochum. M.Sc. in theoretical physics from 
              the University of Brasília. M.Eng. in nuclear sciences from the Polytechnic 
              University of Catalonia. Previously at Max Planck Institute for Plasma Physics and 
              Barcelona Supercomputing Center.
            </p>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Research;
