import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const posts = [
  {
    title: "Volunteer as a Secondary School Teacher",
    date: "March 2025",
    excerpt:
      "On March 2025, I spent a couple of weeks assisting teachers at a secondary boarding school in Nepal.",
    link: "https://264.education/projects/heaven-hill-academy",
    thumbnail: profileImg,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
    images: [profileImg, profileImg, profileImg],
  },
  {
    title: "Exploring High-Energy Neutrino Observations with Information Field Theory",
    date: "January 2025",
    excerpt:
      "I had the opportunity to present my work on Information Field Theory at the Umweltforschungsstation Schneefernerhaus.",
    thumbnail: profileImg,
    content: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.

Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.`,
    images: [profileImg, profileImg],
  },
  {
    title: "Some of my latest paintings",
    date: "September 2024",
    excerpt:
      "A collection of recent oil on canvas works and Kandinsky-inspired sketches, exploring color, form, and abstraction.",
    thumbnail: profileImg,
    content: `Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
    images: [profileImg, profileImg, profileImg, profileImg],
  },
  {
    title: "Hitchhiking across the Balkans",
    date: "July 2024",
    excerpt:
      "A month-long journey through Serbia, Bosnia, Montenegro, and Albania — meeting strangers, sleeping under the stars.",
    thumbnail: profileImg,
    content: `Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
    images: [profileImg, profileImg],
  },
  {
    title: "On the philosophy of measurement in astrophysics",
    date: "April 2024",
    excerpt:
      "A short essay reflecting on the epistemological challenges of observing phenomena we can never directly access.",
    thumbnail: profileImg,
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.

Cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.`,
    images: [profileImg],
  },
  {
    title: "Learning flamenco guitar in Sevilla",
    date: "February 2024",
    excerpt:
      "Two weeks of intensive flamenco lessons in the heart of Andalusia. Thoughts on rhythm, discipline, and listening.",
    thumbnail: profileImg,
    content: `Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    images: [profileImg, profileImg, profileImg],
  },
  {
    title: "First marathon: reflections on endurance",
    date: "November 2023",
    excerpt:
      "Running 42 km through the streets of Munich taught me more about patience than any physics problem ever did.",
    thumbnail: profileImg,
    content: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.`,
    images: [profileImg, profileImg],
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
                Personal view on delicate issues…
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
              <time className="text-[10px] text-white/40 tracking-wide uppercase">
                {posts[selectedPost].date}
              </time>
              <h1 className="text-2xl md:text-3xl font-serif text-white">
                {posts[selectedPost].title}
              </h1>
            </div>

            {/* Image gallery */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              {posts[selectedPost].images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-40 h-28 md:w-52 md:h-36 rounded-xl object-cover shrink-0 border border-white/10"
                />
              ))}
            </div>

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
    </div>
  );
};

export default Blog;
