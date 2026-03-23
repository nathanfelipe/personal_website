import PageTransition from "@/components/PageTransition";

const Research = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="space-y-4 mb-16">
          <p className="text-sm tracking-widest uppercase text-primary">Current Research</p>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground">HELIOSKILL</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            This position is part of the FWO-funded project Helioskill: Heliophysics Simulations & Artificial
            Intelligence, which targets a yet unsolved problem in space and astrophysics: how energy is dissipated in
            virtually collisionless astrophysical plasmas. The research combines high-resolution kinetic simulations
            with in-situ spacecraft observations. It involves unsupervised clustering, and sparse identification of
            nonlinear dynamics, among other machine learning techniques. The work is conducted at the Centre for
            Mathematical Plasma Astrophysics (CmPA) within the Department of Mathematics at KU Leuven.
          </p>
        </div>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">Focus Areas</h2>
            <ul className="space-y-3 text-muted-foreground leading-relaxed">
              <li className="flex gap-3">
                <span className="text-primary mt-1">◦</span>
                <span>HPC fully kinetic particle-in-cell simulations</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">◦</span>
                <span>Analysis of solar wind in-situ data (e.g. Magnetospheric Multiscale Mission)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">◦</span>
                <span>
                  Sparse identification of nonlinear dynamics, physics informed neural networks, and other ML techniques
                  and AI architechtures
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">Background</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ph.D. in physics from Ruhr-Universität Bochum. M.Sc. in theoretical physics from the University of
              Brasília. M.Eng. in nuclear sciences from the Polytechnic University of Catalonia. Previously at Max
              Planck Institute for Plasma Physics and Barcelona Supercomputing Center.
            </p>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Research;
