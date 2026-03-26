import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import princeton1 from "@/assets/princeton_1.jpg";
import princeton2 from "@/assets/princeton_2.jpg";
import talkIft1 from "@/assets/talk_ift_1.jpg";
import talkIft2 from "@/assets/talk_ift_2.jpg";
import talkIsss from "@/assets/talk_aps_1.png";
import talkTransalpine from "@/assets/talk_transalpine_1.png";
import talkAps from "@/assets/talk_aps_1.png";
import talkWisszeit from "@/assets/talk_wisszeit_1.png";
import talkMpgCouncil from "@/assets/talk_mpg_council_1.jpg";
import talkN2 from "@/assets/talk_n2_1.jpg";
import talkScienceSlam from "@/assets/talk_scienceslam_1.jpg";
import talkVlasov from "@/assets/talk_vlasov.png";
import talkTokyo from "@/assets/talk_tokyo.jpg";

const talks = [
  {
    title: "Exploring High-Energy Neutrino Observations with Information Field Theory",
    date: "January 2025",
    excerpt:
      "Presenting work on IFT and its applications to high-energy neutrino observations at the Umweltforschungsstation Schneefernerhaus.",
    thumbnail: talkIft1,
    content: `Recently, I had the opportunity to present my work on Information Field Theory (IFT) and its applications to high-energy neutrino observations at the Umweltforschungsstation Schneefernerhaus, the highest mountain in Germany. This unique research station provided an inspiring setting to discuss the challenges of analyzing astrophysical data, particularly in extracting meaningful signals from complex and noisy datasets. My presentation focused on how IFT provides a probabilistic framework to reconstruct and interpret observational data, enabling us to gain deeper insights into the universe's most energetic phenomena.

A key component of my work involves utilizing the NIFTy package (https://pypi.org/project/nifty8/), a versatile tool designed for the efficient application of IFT to a variety of scientific problems. In the context of neutrino astronomy, NIFTy allows for robust signal inference by modeling uncertainties and correlations in the data, leading to improved reconstructions of neutrino source distributions. During the presentation, I demonstrated how NIFTy aids in processing IceCube data and enhances our understanding of cosmic neutrino sources by leveraging Bayesian inference techniques. This approach not only refines our observational analysis but also paves the way for future advancements in multi-messenger astrophysics.

I would like to extend my sincere gratitude to the Umweltforschungsstation Schneefernerhaus for hosting this event and providing such an exceptional venue for scientific exchange. I am also deeply thankful to the group from the Max Planck Institute for Astrophysics for their kind invitation and the opportunity to present my work. Their insightful discussions and valuable feedback have greatly contributed to the ongoing development of my research on Information Field Theory and its application to high-energy neutrino and space physics observations.`,
    images: [talkIft1, talkIft2],
  },
  {
    title: "15th International Symposium for Space Simulations (ISSS-15) & IPELS-16",
    date: "November 2024",
    excerpt:
      "Presenting Alis Helios, a tool providing GUI-based analysis of astrophysical and space science data.",
    thumbnail: talkIsss,
    content: `During the ISSS-15, I presented the first update on a code I have been developing for the past 4 months. Alis Helios is an ongoing project that provides tools and a graphical user interface (GUI) to analyze astrophysical and space science data, supporting various computational functionalities such as orbit calculations, power spectral density analysis, and data visualization.`,
    images: [talkIsss],
  },
  {
    title: "Transalpine Workshop on Magnetic Reconnection and Turbulence in Space and Fusion Plasmas",
    date: "September 2024",
    excerpt:
      "Communicating recent results on magnetic reconnection and turbulence in space and fusion plasmas.",
    thumbnail: talkTransalpine,
    content: `The aim of the mini-workshop was to communicate recent results on topics of common interest (such as: "Plasmas, Théorie et Modélisation", "Turbulence Fluides et Plasmas") active in the study of magnetic reconnection and turbulence in space and fusion plasmas.`,
    images: [talkTransalpine],
  },
  {
    title: "2023 American Physical Society Annual Meeting, Division of Plasma Physics",
    date: "October 2023",
    excerpt:
      "Talk at the APS DPP annual meeting on plasma astrophysics research.",
    thumbnail: talkAps,
    content: `Presentation at the 2023 American Physical Society annual meeting, Division of Plasma Physics.`,
    images: [talkAps],
  },
  {
    title: "Wissenschaftszeitvertragsgesetz — Science Policy Engagement",
    date: "May 2023",
    excerpt:
      "Engaging with the Max Planck PostdocNet on science policies and the WissZeitVG at the Harnack-Haus in Berlin.",
    thumbnail: talkWisszeit,
    content: `On May 2023, the Steering Group of the Max Planck PostdocNet engaged with several members from various working groups at the Max Planck Institute for the History of Science. We convened to explore themes pertinent to the General Meeting, which will take place in Munich, the annual survey, and other topics. Moreover, we also attended a high-level panel at the Harnack-Haus in Berlin, and together with the Presidents of the Max Planck Society and the Helmholtz Association, we deliberate on science policies that could potentially influence the Wissenschaftszeitvertragsgesetz.`,
    images: [talkWisszeit],
  },
  {
    title: "Meeting with the Scientific Council of the Max Planck Society & Open Science Strategy Panel",
    date: "February 2023",
    excerpt:
      "Attending the Scientific Council meeting and an internal panel on developing an Open Science strategy for the MPG.",
    thumbnail: talkMpgCouncil,
    content: `In February 2023, the spokesperson of Postdocnet and I attended a meeting with an internal MPG panel that aimed to develop an Open Science strategy for the Max Planck Society. Later that week, we were invited to the Scientific Council meeting, where we heard and discussed topics pertinent to the internal administration of the society, such as academic governance, science communication and the WissenschaftsZeitVertragsGesetz.`,
    images: [talkMpgCouncil],
  },
  {
    title: "N2 Conference — From Research to Application, Berlin",
    date: "November 2019",
    excerpt:
      "Coordinating the programme committee and moderating a panel discussion at Germany's biggest doctoral researchers' association.",
    thumbnail: talkN2,
    content: `"The N2 Event 2019 unites selected leading scientists from academic research and industry with excellent doctoral researchers from various research fields of N2—the biggest association of doctoral researchers in Germany. In this interdisciplinary atmosphere we will have presentations, workshops and open discussions about the role of basic research and how it can contribute to and translate into commercial interest. Connecting young scientist with experienced pioneers as well as basic research with industry will contribute to mutual exchange, growing networks between disciplines and discovering new perspectives."

At the N2 conference, I worked as the coordinator of the programme committee and also as the moderator of the second panel discussion. This experience helped me to understand how important it is to develop skills related to Project Management in the context of an academic career. Furthermore, working with the amazing N2 team was one of the best experiences I had this year. I look forward to be able to have a greater impact on society, beyond the scope of my scientific work.

During the same year I worked as co-coordinator of the Munich hub of PhD representatives of the Max Planck Society. This experience further helped me to develop a solid leadership profile, rooted in throughout communication with my peers, and proper delegation of tasks according to strengths and proactiveness.`,
    images: [talkN2],
  },
  {
    title: "Talk at Princeton Plasma Physics Laboratory Graduate Summer School",
    date: "October 2019",
    excerpt:
      "Oral presentation on Differential Geometry tools for Kinetic Physics of Astrophysical Plasmas at the PPPL Graduate Summer School.",
    thumbnail: princeton1,
    content: `During the summer school, a few of the participants were offered the possibility to present their PhD project as an oral presentation instead of a poster. I volunteered myself to do so, and prepared my presentation in a way in which I not only communicated the state-of-the-art of my work, but went beyond. In the context of Differential Geometry, I gave a brief introduction to the tools required to better understand my approach to Kinetic Physics of Astrophysical Plasmas. A video of the talk will be soon posted here.`,
    images: [princeton1, princeton2],
  },
  {
    title: "Why Science? — Munich Science Slam",
    date: "June 2019",
    excerpt:
      "A relaxed atmosphere where young researchers practice giving engaging scientific talks.",
    thumbnail: talkScienceSlam,
    content: `"Scientists need to be able to clearly and precisely communicate their findings in order to advance their personal careers, advance the scientific knowledge, and advance public awareness to increase scientific support and help inform decision and policy makers. The Munich Science Slam is a relaxed and pleasant atmosphere where young early researchers practice giving engaging scientific talks."`,
    images: [talkScienceSlam],
    link: "https://www.youtube.com/watch?v=nkE0jig5nb0",
  },
  {
    title: "Sixth International Workshop on the Theory and Applications of the Vlasov Equation, Strasbourg",
    date: "July 2019",
    excerpt:
      "Presentation at the Vlasov equation workshop in Strasbourg, France.",
    thumbnail: talkVlasov,
    content: `Presentation at the Sixth International Workshop on the Theory and Applications of the Vlasov Equation, held in July 2019 in Strasbourg, France.`,
    images: [talkVlasov],
    link: "https://vlasovia2019.sciencesconf.org/",
  },
  {
    title: "Max Planck Princeton (MPPC) Meeting in Tokyo",
    date: "February 2019",
    excerpt:
      "Talk given at the MPPC meeting in Tokyo.",
    thumbnail: talkTokyo,
    content: `Talk given at the Max Planck Princeton Center (MPPC) meeting in Tokyo on February 2019.`,
    images: [talkTokyo],
    link: "http://reso.nifs.ac.jp/eng/mppc/index.html",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const Talks = () => {
  const [selectedTalk, setSelectedTalk] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <div className="px-8 md:px-12 py-12 md:py-16 h-full overflow-y-auto relative">
      <AnimatePresence mode="wait">
        {selectedTalk === null ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3 mb-12">
              <p className="text-xs tracking-[0.3em] uppercase text-white/50">Talks & Presentations</p>
              <div className="w-12 h-px bg-white/30" />
              <h1 className="text-3xl md:text-4xl font-serif text-white">
                Conferences, seminars, and invited talks
              </h1>
            </div>

            <div className="space-y-0 divide-y divide-white/10">
              {talks.map((talk, i) => (
                <motion.article
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="py-8 first:pt-0 last:pb-0"
                >
                  <div className="flex gap-5 items-start max-w-2xl">
                    <img
                      src={talk.thumbnail}
                      alt=""
                      loading="lazy"
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0 border border-white/10 mt-1"
                    />
                    <div className="space-y-2 min-w-0">
                      <time className="text-[10px] text-white/40 tracking-wide uppercase">{talk.date}</time>
                      <h2
                        onClick={() => setSelectedTalk(i)}
                        className="text-xl md:text-2xl font-serif text-white hover:text-white/70 cursor-pointer transition-colors"
                      >
                        {talk.title}
                      </h2>
                      <p className="text-sm text-white/60 leading-relaxed">{talk.excerpt}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setSelectedTalk(null)}
              className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 tracking-wide uppercase transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <div className="space-y-3 mb-8">
              <time className="text-[10px] text-white/40 tracking-wide uppercase">{talks[selectedTalk].date}</time>
              <h1 className="text-2xl md:text-3xl font-serif text-white">{talks[selectedTalk].title}</h1>
            </div>

            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              {talks[selectedTalk].images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  loading="lazy"
                  onClick={() => setLightbox({ images: talks[selectedTalk!].images, index: i })}
                  className="h-36 md:h-48 w-auto max-w-[280px] rounded-xl object-contain shrink-0 border border-white/10 cursor-pointer hover:opacity-80 transition-opacity bg-black/20"
                />
              ))}
            </div>

            <div className="max-w-2xl space-y-4">
              {talks[selectedTalk].content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-sm text-white/60 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {talks[selectedTalk].link && (
              <a
                href={talks[selectedTalk].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 text-xs text-white/50 hover:text-white/80 tracking-wide transition-colors"
              >
                External link →
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Lightbox
        images={lightbox?.images ?? []}
        initialIndex={lightbox?.index ?? 0}
        open={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
};

export default Talks;
