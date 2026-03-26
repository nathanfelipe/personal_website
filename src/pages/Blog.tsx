import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import profileImg from "@/assets/profile.jpg";
import bioVolunteer1 from "@/assets/bio_volunteer_1.jpg";
import bioVolunteer2 from "@/assets/bio_volunteer_2.jpg";
import bioVolunteer3 from "@/assets/bio_volunteer_3.jpg";
import bioPaintings1 from "@/assets/bio_paintings_1.jpg";
import bioPaintings2 from "@/assets/bio_paintings_2.jpg";
import bioPaintings3 from "@/assets/bio_paintings_3.jpg";
import bioPostdocnet1 from "@/assets/bio_postdocnet_1.png";
import bioPostdocnet2 from "@/assets/bio_postdocnet_2.png";
import bioWeekend1 from "@/assets/bio_weekend_1.png";
import bioWeekend2 from "@/assets/bio_weekend_2.png";
import bioAmazon1 from "@/assets/bio_amazon_1.png";
import bioAmazon2 from "@/assets/bio_amazon_2.png";
import bioAmazon3 from "@/assets/bio_amazon_3.png";
import bioKunst1 from "@/assets/bio_kunst_1.png";
import bioKunst2 from "@/assets/bio_kunst_2.png";
import bioArt1 from "@/assets/bio_art_1.jpg";
import bioArt2 from "@/assets/bio_art_2.jpg";
import bioBirthday from "@/assets/bio_birthday.jpg";
import bioRussia from "@/assets/bio_russia.jpg";
import bioPhdnet1 from "@/assets/bio_phdnet_1.jpg";
import bioPhdnet2 from "@/assets/bio_phdnet_2.jpg";
import bioPhdnet3 from "@/assets/bio_phdnet_3.jpg";
import bioPrace from "@/assets/bio_prace.jpg";

const posts = [
  {
    title: "Volunteer as a Secondary School Teacher",
    date: "March 2025",
    excerpt: "On March 2025, I spent a couple of weeks assisting teachers at a secondary boarding school in Nepal.",
    link: "https://264.education/projects/heaven-hill-academy",
    thumbnail: bioVolunteer1,
    content: `On March 2025, I spent a couple of weeks assisting teachers at a secondary boarding school in Nepal. Together with a team of volunteers, we helped to prepare the exams, taught some classes, organised administrative tasks and even helped to construct new classrooms. For further information about the work, I would highly recommend a quick visit on their website: 264.education/projects/heaven-hill-academy :)`,
    images: [bioVolunteer1, bioVolunteer2, bioVolunteer3],
  },
  {
    title: "Some of my latest paintings",
    date: "September 2024",
    excerpt: "A collection of recent oil on canvas works and Kandinsky-inspired sketches, exploring color, form, and abstraction.",
    thumbnail: bioPaintings1,
    content: `A collection of recent oil on canvas works and Kandinsky-inspired sketches, exploring color, form, and abstraction.`,
    images: [bioPaintings1, bioPaintings2, bioPaintings3],
  },
  {
    title: "Last PostdocNet meeting as deputy spokesperson",
    date: "September 2024",
    excerpt: "October 2023 was my last General Meeting with PostdocNet as the deputy spokesperson.",
    thumbnail: bioPostdocnet1,
    content: `October 2023 was my last General Meeting with PostdocNet as the deputy spokesperson. It's indescribable how much of a pleasure it was to be part of such an outstanding group, advocating for a healthier and fairer academic environment. I also felt humbled to serve as a panelist in a discussion about excellence in academia alongside many high-profile figures. It was the perfect pitstop between Indonesia and the Dominican Republic. I even had the opportunity of being a guest on a panel discussing mental health in academia.`,
    images: [bioPostdocnet1, bioPostdocnet2],
  },
  {
    title: "(some) weekend vibes...",
    date: "September 2024",
    excerpt: "Next time someone asks me what I do for a living, I'll tell them, 'I basically transform coffee into anxiety and pictures of the universe.'",
    thumbnail: bioWeekend1,
    content: `Next time someone asks me what I do for a living, I'll tell them, 'I basically transform coffee into anxiety and pictures of the universe.'`,
    images: [bioWeekend1, bioWeekend2],
  },
  {
    title: "Visit to the Sateré Mawé: An Amazonian indigenous tribe",
    date: "September 2024",
    excerpt: "The visit took place on January 2022. I was fascinated with the Amazon beauty.",
    thumbnail: bioAmazon1,
    content: `The visit took place on January 2022. I was fascinated with the Amazon beauty. I still had the opportunity to talk about human nature with Indigenous Anthropologist Prof. Gersem Baniwa, and another delightful experience of talking to a group of indigenous people in Taucapeçaçu about Astrophysics and indigenous mythology.`,
    images: [bioAmazon1, bioAmazon2, bioAmazon3],
  },
  {
    title: "The amalgamation of the sociology of knowledge and philosophy of science",
    date: "March 2023",
    excerpt: "I decided to take a week off and write about something that was a pleasure — my views on the sociology of knowledge and philosophy of science.",
    thumbnail: profileImg,
    link: "http://www.nathan.science/uploads/7/5/3/6/75368143/thesis_first_chapter.pdf",
    content: `In order to distract myself from the overwhelming task of writing my PhD thesis, I decided to take a week off and write about something that was a C^∞ amount of pleasure. I have been developing a rather primitive and unsophisticated synthesis of my views on the sociology of knowledge and philosophy of science. Although I plan to work on this manuscript more seriously in the future, for now I am sharing the first chapter of the thesis. Feedback is deeply appreciated.`,
    images: [],
  },
  {
    title: "What is like to write a PhD thesis",
    date: "December 2021",
    excerpt: "Completing a PhD will transform you, and writing the thesis will actualize that transformation.",
    thumbnail: profileImg,
    content: `Completing a PhD will transform you, and writing the thesis will actualize that transformation.

Apocryphal estimates prophesy that a PhD thesis is fully read only 1.6 times in average. Many people perceive the writing of a PhD thesis as a mere comeuppance imposed by academic institutions. Others perceive the overview of more than three to four years of dedication to scientific investigation as more than a purely bureaucratic process. Regardless of which of those two extremes position one finds oneself, we cannot help but to see our thesis as a decisive point in the start of our scientific crusade.

One could argue that that is the case due to the fact that similarly to a mirror, a thesis is a reflection of how we perceive ourselves. Often when looking at a mirror, we think of the past and how our decisions led us to become what we are. Our reflection on a mirror persuades us to wonder the nature and meaning of our goals and motivations. The writing of a thesis is a similar process, in the sense that it is the material manifestation of a deeply personal and subjective transformational process.

In writing a thesis, we expose ourselves to our current deepest fears and anxieties, concerns about incompetence, and the feeling that things are not where they are supposed to be and we don't belong anywhere. Our existential condition becomes a prison of our own making.

Although this description seems overwhelmingly terrifying and, one might argue, pathological in nature, we cannot escape the perils of the route towards self actualization. Our material thesis becomes an echo of our immaterial thesis. The sum of our choices, hopes, and aspirations to what we want to become, condensed in a few hundred pages. Beyond the words, methodologies, results... we see all the sacrifices we have made behind the many pages that lay before our obfuscated gaze.

The process of scientific metamorphosis manifests itself in a material form and we are faced with a tangible realization of our past choices, and the consequences they will foment. It is an inflection point. Past and future coalesce to embody the highest expression of our scientific becoming. Our thesis.

The thesis is a conversation we have with ourselves. An act of re-discovery and a deeply all encompassing experience. But we are not alone in this journey, and so isn't our thesis. Just like ourselves, it will become an infinitesimal contribution to an abysmal ocean of potentialities.

It is better imperfectly finished, than perfectly unfinished. The opportunity to further amelioration lies in an endless journey thenceforth.`,
    images: [],
  },
  {
    title: "Was ist nicht Kunst?",
    date: "October 2019",
    excerpt: "A gallery of sketches and paintings — exploring the question of what is and isn't art.",
    thumbnail: bioKunst1,
    content: `A gallery of sketches and paintings — exploring the question of what is and isn't art.`,
    images: [bioKunst1, bioKunst2],
  },
  {
    title: "What is not art?",
    date: "October 2019",
    excerpt: "A collection of photographs and artworks questioning the boundaries of artistic expression.",
    thumbnail: bioArt1,
    content: `A collection of photographs and artworks questioning the boundaries of artistic expression.`,
    images: [bioArt1, bioArt2],
  },
  {
    title: "25th anniversary — The year I spent my birthday giving classes of physics to master students in Bochum",
    date: "November 2018",
    excerpt: 'Conclusion of my class on relativistic electromagnetism: "If you wish to make an apple pie from scratch, you must first invent the universe."',
    thumbnail: bioBirthday,
    content: `Conclusion of my class on relativistic electromagnetism: "If you wish to make an apple pie from scratch, you must first invent the universe."`,
    images: [bioBirthday],
  },
  {
    title: "Summer school on plasma physics — Russia",
    date: "November 2018",
    excerpt: "Занятия на русском языке были очень полезными.",
    thumbnail: bioRussia,
    content: `Занятия на русском языке были очень полезными.`,
    images: [bioRussia],
  },
  {
    title: "PhDnet representatives General Meeting 2018",
    date: "November 2018",
    excerpt: "General Meeting of the PhD representatives of all Max Planck Institutes around the planet.",
    thumbnail: bioPhdnet1,
    content: `General Meeting of the PhD representatives of all Max Planck Institutes around the planet. The objective is to improve working conditions of all PhD students in the Max Planck Society, fight power abuse, improve conflict resolution in workplace and enhance interdisciplinary collaboration between the different institutes.`,
    images: [bioPhdnet1, bioPhdnet2, bioPhdnet3],
  },
  {
    title: "Best Poster Award at the PRACEdays17 conference",
    date: "November 2018",
    excerpt: "Received the Best Poster Award at the PRACEdays17 conference.",
    thumbnail: bioPrace,
    content: `Received the Best Poster Award at the PRACEdays17 conference.`,
    images: [bioPrace],
  },
  {
    title: "Countries I have been to... (29/215 and counting!)",
    date: "July 2018",
    excerpt: '"One\'s destination is never a place, but always a new way of seeing things." — Henry Miller',
    thumbnail: profileImg,
    content: `"One's destination is never a place, but always a new way of seeing things." — Henry Miller`,
    images: [],
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

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <div className="px-8 md:px-12 py-12 md:py-16 h-full overflow-y-auto relative">
      <AnimatePresence mode="wait">
        {selectedPost === null ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3 mb-12">
              <p className="text-xs tracking-[0.3em] uppercase text-white/50">Bio & Blog</p>
              <div className="w-12 h-px bg-white/30" />
              <h1 className="text-3xl md:text-4xl font-serif text-white">
                No man is an island entire of itself; every man is a piece of the continent…
              </h1>
            </div>

            <div className="space-y-0 divide-y divide-white/10">
              {posts.map((post, i) => (
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
                      src={post.thumbnail}
                      alt=""
                      loading="lazy"
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0 border border-white/10 mt-1"
                    />
                    <div className="space-y-2 min-w-0">
                      <time className="text-[10px] text-white/40 tracking-wide uppercase">{post.date}</time>
                      <h2
                        onClick={() => setSelectedPost(i)}
                        className="text-xl md:text-2xl font-serif text-white hover:text-white/70 cursor-pointer transition-colors"
                      >
                        {post.title}
                      </h2>
                      <p className="text-sm text-white/60 leading-relaxed">{post.excerpt}</p>
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
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 tracking-wide uppercase transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <div className="space-y-3 mb-8">
              <time className="text-[10px] text-white/40 tracking-wide uppercase">{posts[selectedPost].date}</time>
              <h1 className="text-2xl md:text-3xl font-serif text-white">{posts[selectedPost].title}</h1>
            </div>

            {/* Image gallery */}
            {posts[selectedPost].images.length > 0 && (
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {posts[selectedPost].images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    loading="lazy"
                    onClick={() => setLightbox({ images: posts[selectedPost!].images, index: i })}
                    className="h-36 md:h-48 w-auto max-w-[280px] rounded-xl object-contain shrink-0 border border-white/10 cursor-pointer hover:opacity-80 transition-opacity bg-black/20"
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="max-w-2xl space-y-4">
              {posts[selectedPost].content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-sm text-white/60 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {posts[selectedPost].link && (
              <a
                href={posts[selectedPost].link}
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

export default Blog;
