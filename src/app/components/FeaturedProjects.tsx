import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const filters = ["Vše", "Byty", "Komerční", "SVJ", "Developers"];

const projects = [
  {
    title: "Rezidence Vinohrady",
    category: "Byty",
    area: "320 m²",
    image:
      "https://images.unsplash.com/photo-1758548157747-285c7012db5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXBhcnRtZW50JTIwaW50ZXJpb3IlMjB3aGl0ZXxlbnwxfHx8fDE3NzEzMjcxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Kancelář Karlín Tech Hub",
    category: "Komerční",
    area: "850 m²",
    image:
      "https://images.unsplash.com/photo-1764410481612-7544525b2991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2UlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NzEzMjcxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Bytový dům Holešovice",
    category: "SVJ",
    area: "2 400 m²",
    image:
      "https://images.unsplash.com/photo-1740686170590-40fc6deeae2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzaW5nJTIwYXNzb2NpYXRpb24lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZmFjYWRlfGVufDF8fHx8MTc3MTMyNzE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Projekt Nová Libeň",
    category: "Developers",
    area: "5 000 m²",
    image:
      "https://images.unsplash.com/photo-1742042512883-3bdc4e156866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQcmFndWUlMjBhcmNoaXRlY3R1cmUlMjBtb2Rlcm4lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzEzMjcxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Penthouse Smíchov",
    category: "Byty",
    area: "180 m²",
    image:
      "https://images.unsplash.com/photo-1759150712360-6d48015e4f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjByZW5vdmF0aW9uJTIwbW9kZXJuJTIwZGVzaWdufGVufDF8fHx8MTc3MTMyNzE2MHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Lobby Anděl Business Park",
    category: "Komerční",
    area: "400 m²",
    image:
      "https://images.unsplash.com/photo-1768270181430-3e3672a32283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBsb2JieSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTMyNzE1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("Vše");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects =
    activeFilter === "Vše"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="realizace"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-secondary/50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span
                className="text-accent font-sans tracking-widest uppercase mb-4 block"
                style={{ fontSize: "12px", fontWeight: 600 }}
              >
                Portfolio
              </span>
              <h2
                className="font-serif text-foreground"
                style={{
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                Vybrané
                <br />
                <span className="italic text-foreground/60">realizace</span>
              </h2>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                data-cursor-hover
                className={`px-5 py-2 rounded-full transition-all duration-300 font-sans ${
                  activeFilter === filter
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                {filter}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/5]"
              data-cursor-hover
            >
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span
                  className="text-white/60 font-sans mb-1"
                  style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em" }}
                >
                  {project.category} · {project.area}
                </span>
                <h3
                  className="text-white font-sans"
                  style={{ fontSize: "20px", fontWeight: 600 }}
                >
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}