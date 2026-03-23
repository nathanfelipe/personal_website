import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const talks = [
  {
    title: "Example Talk Title",
    date: "March 2025",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnail: profileImg,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    images: [profileImg, profileImg],
  },
  {
    title: "Another Talk Placeholder",
    date: "January 2025",
    excerpt: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    thumbnail: profileImg,
    content: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.`,
    images: [profileImg],
  },
  {
    title: "Conference Presentation Example",
    date: "September 2024",
    excerpt: "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    thumbnail: profileImg,
    content: `Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.`,
    images: [profileImg, profileImg, profileImg],
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
                  className="w-40 h-28 md:w-52 md:h-36 rounded-xl object-cover shrink-0 border border-white/10"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Talks;
