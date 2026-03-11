import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, Heart, Target, Users, Award, Sparkles, Shield } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* Real team members matching the Figma design */
const team = [
  {
    name: "MAREK",
    role: "Zakladatel",
    image: "https://images.unsplash.com/photo-1607969892192-8aa9fe65ee26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBtYW4lMjBwb3J0cmFpdCUyMGNyYWZ0c21hbiUyMGV4cGVyaWVuY2VkfGVufDF8fHx8MTc3MTM0MDg5MHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "ALBERT",
    role: "Malíř",
    image: "https://images.unsplash.com/photo-1584677717756-318ebaf7e1e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGRhcmslMjBjdXJseSUyMGhhaXIlMjBjcmVhdGl2ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTM0MDg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "VINCENT",
    role: "Malíř",
    image: "https://images.unsplash.com/photo-1754091152246-8d48d91666f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGNhc3VhbCUyMHBvcnRyYWl0JTIwb3V0ZG9vcnMlMjBuYXR1cmFsfGVufDF8fHx8MTc3MTM0MDg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "LENKA",
    role: "Koordinace",
    image: "https://images.unsplash.com/photo-1758598304332-94b40ce7c7b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzcxMzQwODkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "PAVEL",
    role: "Malíř",
    image: "https://images.unsplash.com/photo-1582562124760-06459ed90888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGJlYW5pZSUyMGhhdCUyMGFydGlzdGljJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxMzQwODkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const timeline = [
  { year: "~1995", title: "Začátky Marka", desc: "Zakladatel firmy Marek začíná s malbou – postupně získává zkušenosti, které dnes čítají přes 30 let." },
  { year: "~2015", title: "Založení firmy", desc: "Marek zakládá firmu Malíři v černém s vizí rodinného podniku a moderního přístupu k tradičnímu řemeslu." },
  { year: "2018", title: "Synové se přidávají", desc: "Albert a Vincent, Markovi synové, se postupně zapojují do firmy a přinášejí novou energii." },
  { year: "2020", title: "Rozšíření týmu", desc: "K rodinné firmě se přidávají blízcí přátelé – Lenka a Pavel. Tým roste a kapacita se zvyšuje." },
  { year: "2023", title: "500+ zakázek", desc: "Překonáváme hranici 500 úspěšně dokončených zakázek. Důkaz poctivé manuální práce." },
  { year: "2026", title: "Nová éra", desc: "Online kalkulačka, digitální procesy a neustálý růst. Firma funguje přes 10 let." },
];

const values = [
  { icon: Target, title: "Preciznost", desc: "Každý detail se počítá.", gradient: "from-[#1e3a5f]/25" },
  { icon: Heart, title: "Vášeň", desc: "Poctivá manuální práce nás baví.", gradient: "from-[#c08050]/25" },
  { icon: Users, title: "Rodinné hodnoty", desc: "Jsme rodina — a tak přistupujeme i ke klientům.", gradient: "from-[#8a9a7a]/25" },
  { icon: Shield, title: "Spolehlivost", desc: "Na naše slovo se můžete spolehnout.", gradient: "from-accent/25" },
  { icon: Sparkles, title: "Kvalita", desc: "Pouze ověřené materiály a profesionální vybavení.", gradient: "from-[#1e3a5f]/25" },
  { icon: Award, title: "Tradice", desc: "Přes 30 let zkušeností zakladatele.", gradient: "from-[#c08050]/25" },
];

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 noise-overlay overflow-hidden" style={{ background: "linear-gradient(160deg, #ffffff 0%, #f4f8ff 52%, #ffffff 100%)" }}>
        <div className="absolute w-[700px] h-[700px] -top-[200px] -right-[200px] rounded-full blur-[200px] animate-float-slow pointer-events-none" style={{ background: "rgba(37,99,235,0.10)" }} />
        <div className="absolute w-[400px] h-[400px] bottom-0 -left-[100px] rounded-full blur-[150px] animate-float-reverse pointer-events-none" style={{ background: "rgba(124,58,237,0.08)" }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-6 block" style={{ fontSize: "12px", fontWeight: 600 }}>O nás</span>
            <h1 className="font-[family-name:var(--font-display)] text-foreground mb-8" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1 }}>
              Česká rodinná firma, která společně{" "}
              <span className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">funguje už přes 10 let</span>
            </h1>
            <div className="font-sans max-w-3xl mx-auto space-y-2" style={{ fontSize: "16px", lineHeight: 1.82, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>
              <p>Naše firma se věnuje tradičnímu řemeslu.</p>
              <p>Zakladatel firmy, Marek, má s malbou jako takovou zkušenosti už přes 30 let.</p>
              <p>Jeho dva synové Albert a Vincent a blízcí přátelé se postupně přidali.</p>
              <p>Poctivá, manuální práce nás baví a důkazem toho je přes 500 úspěšně dokončených zakázek.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team — matching the Figma design with 5 members in a row */}
      <section className="relative py-24 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)" }}>
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[200px] pointer-events-none" style={{ background: "var(--orb-accent)" }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center group"
                >
                  <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden mb-5" style={{ border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 16px 40px rgba(15,23,42,0.06)" }}>
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <span className="text-foreground font-[family-name:var(--font-display)] tracking-widest" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em" }}>
                    {member.name}
                  </span>
                  <span className="font-sans mt-1" style={{ fontSize: "12px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {member.role}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="text-center mt-20">
              <h2 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.1 }}>
                Jsme <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Malíři v černém.</span>
              </h2>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24 noise-overlay" ref={timelineRef} style={{ background: "linear-gradient(180deg, var(--s2) 0%, var(--s1) 50%, var(--s2) 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4 block" style={{ fontSize: "12px", fontWeight: 600 }}>Naše cesta</span>
              <h2 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em" }}>Přes 10 let <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#2563eb" }}>vývoje</span></h2>
            </div>
          </Reveal>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-foreground/8">
              <motion.div className="w-full origin-top" style={{ background: "linear-gradient(180deg, var(--accent), transparent)" }} initial={{ scaleY: 0 }} animate={timelineInView ? { scaleY: 1 } : {}} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} />
            </div>
            <div className="flex flex-col gap-12">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} pl-12 md:pl-0`}>
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/30 z-10" />
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                      <span className="font-[family-name:var(--font-display)] text-accent block mb-2" style={{ fontSize: "14px", fontWeight: 700 }}>{item.year}</span>
                      <h3 className="text-foreground font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "20px", fontWeight: 600 }}>{item.title}</h3>
                      <p className="font-sans" style={{ fontSize: "14px", lineHeight: 1.7, color: "#5b6877", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>{item.desc}</p>
                    </div>
                    <div className="hidden md:block flex-1" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s2) 0%, var(--s1) 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4 block" style={{ fontSize: "12px", fontWeight: 600 }}>Hodnoty</span>
              <h2 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em" }}>Na čem <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#2563eb" }}>stavíme</span></h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group p-7 rounded-[26px] transition-all duration-500 hover:-translate-y-1" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 16px 42px rgba(15,23,42,0.05)" }}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.gradient} to-transparent flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    <v.icon size={20} className="text-[#2563eb]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2" style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.035em", color: "#0f172a" }}>{v.title}</h3>
                  <p className="font-sans" style={{ fontSize: "14px", lineHeight: 1.7, color: "#5b6877", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1), var(--s2))" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-foreground mb-6" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700 }}>Chcete se k nám přidat?</h2>
            <p className="text-foreground/40 font-sans mb-10 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>Hledáme talentované malíře, kteří sdílejí naše hodnoty poctivé práce.</p>
            <Link to="/kontakt" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20" style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", fontSize: "15px", fontWeight: 600 }}>
              Kontaktujte nás <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
