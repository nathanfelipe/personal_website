import PageTransition from "@/components/PageTransition";

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

const Blog = () => {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="space-y-4 mb-16">
          <p className="text-sm tracking-widest uppercase text-primary">Bio & Blog</p>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground">
            Personal view on delicate issues…
          </h1>
        </div>

        <div className="space-y-0 divide-y divide-border/50">
          {posts.map((post, i) => (
            <article key={i} className="py-12 first:pt-0 last:pb-0">
              <div className="space-y-4 max-w-2xl">
                <time className="text-sm text-muted-foreground tracking-wide">{post.date}</time>
                <h2 className="text-2xl md:text-3xl font-serif text-foreground">{post.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-primary hover:underline tracking-wide"
                  >
                    Read more →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Blog;
