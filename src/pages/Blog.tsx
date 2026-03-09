import { motion } from "framer-motion";

const posts = [
  {
    title: "Volunteer as a Secondary School Teacher",
    date: "March 2025",
    excerpt:
      "On March 2025, I spent a couple of weeks assisting teachers at a secondary boarding school in Nepal. Together with a team of volunteers, we helped to prepare the exams, taught some classes, organised administrative tasks and even helped to construct new classrooms.",
    link: "https://264.education/projects/heaven-hill-academy",
  },
  {
    title: "Exploring High-Energy Neutrino Observations with Information Field Theory",
    date: "January 2025",
    excerpt:
      "I had the opportunity to present my work on Information Field Theory and its applications to high-energy neutrino observations at the Umweltforschungsstation Schneefernerhaus, the highest mountain in Germany.",
  },
  {
    title: "Some of my latest paintings",
    date: "September 2024",
    excerpt:
      "A collection of recent oil on canvas works and Kandinsky-inspired sketches, exploring color, form, and abstraction.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const Blog = () => {
  return (
    <div className="px-8 md:px-12 py-12 md:py-16">
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
            <div className="space-y-3 max-w-2xl">
              <time className="text-[10px] text-white/40 tracking-wide uppercase">{post.date}</time>
              <h2 className="text-xl md:text-2xl font-serif text-white">{post.title}</h2>
              <p className="text-sm text-white/60 leading-relaxed">{post.excerpt}</p>
              {post.link && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-white/50 hover:text-white/80 tracking-wide transition-colors"
                >
                  Read more →
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
