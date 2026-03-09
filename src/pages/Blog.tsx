import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const posts = [
  {
    title: "Volunteer as a Secondary School Teacher",
    date: "March 2025",
    excerpt:
      "On March 2025, I spent a couple of weeks assisting teachers at a secondary boarding school in Nepal. Together with a team of volunteers, we helped to prepare the exams, taught some classes, organised administrative tasks and even helped to construct new classrooms.",
    link: "https://264.education/projects/heaven-hill-academy",
    thumbnail: profileImg,
  },
  {
    title: "Exploring High-Energy Neutrino Observations with Information Field Theory",
    date: "January 2025",
    excerpt:
      "I had the opportunity to present my work on Information Field Theory and its applications to high-energy neutrino observations at the Umweltforschungsstation Schneefernerhaus, the highest mountain in Germany.",
    thumbnail: profileImg,
  },
  {
    title: "Some of my latest paintings",
    date: "September 2024",
    excerpt:
      "A collection of recent oil on canvas works and Kandinsky-inspired sketches, exploring color, form, and abstraction.",
    thumbnail: profileImg,
  },
  {
    title: "Hitchhiking across the Balkans",
    date: "July 2024",
    excerpt:
      "A month-long journey through Serbia, Bosnia, Montenegro, and Albania — meeting strangers, sleeping under the stars, and rediscovering the art of slow travel.",
    thumbnail: profileImg,
  },
  {
    title: "On the philosophy of measurement in astrophysics",
    date: "April 2024",
    excerpt:
      "A short essay reflecting on the epistemological challenges of observing phenomena we can never directly access, and what it means to 'know' something about the cosmos.",
    thumbnail: profileImg,
  },
  {
    title: "Learning flamenco guitar in Sevilla",
    date: "February 2024",
    excerpt:
      "Two weeks of intensive flamenco lessons in the heart of Andalusia. Thoughts on rhythm, discipline, and why the hardest part is learning to listen.",
    thumbnail: profileImg,
  },
  {
    title: "First marathon: reflections on endurance",
    date: "November 2023",
    excerpt:
      "Running 42 km through the streets of Munich taught me more about patience than any physics problem ever did. A personal account of training, suffering, and crossing the finish line.",
    thumbnail: profileImg,
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
  return (
    <div className="px-8 md:px-12 py-12 md:py-16 h-full overflow-y-auto">
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
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
