import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Phone, Send, Calculator, Paintbrush, CheckCircle2 } from "lucide-react";
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

const servicesData: Record<string, { title: string; tag: string; image: string; heroDesc: string; features: string[]; process: { step: string; desc: string; icon: typeof Send }[]; priceHint: string; cta: string }> = {
  "malovani-bytu": { title: "Malování bytů", tag: "Rezidenční", image: "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fccb0003eea4f4419ae5d6485d2222ae5", heroDesc: "Kompletní malířské služby pro byty a rodinné domy. Od jednopokojových bytů po luxusní rezidence – každý prostor si zaslouží precizní péči.", features: ["Kompletní zakrytí nábytku a podlah fóliemi", "Příprava povrchů — tmelení, broušení, penetrace", "Malování stěn a stropů prémiovými barvami", "Dekorativní lemy, bordury a barevné kombinace", "Finální kontrola kvality a úklid", "Poradenství při výběru barev zdarma"], process: [{ step: "Prohlídka", desc: "Bezplatná návštěva a posouzení stavu", icon: Send }, { step: "Kalkulace", desc: "Detailní cenová nabídka do 24 hodin", icon: Calculator }, { step: "Realizace", desc: "Precizní provedení v dohodnutém termínu", icon: Paintbrush }, { step: "Předání", desc: "Kontrola, úklid a spokojenost", icon: CheckCircle2 }], priceHint: "Od 85 Kč/m²", cta: "Poptat malování bytu" },
  "malovani-pred-prodejem": { title: "Malování před prodejem nebo pronájmem", tag: "Osobní", image: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F6f785ac818cd4504aa3ddbdcc553358c", heroDesc: "Rychlé a efektivní malování, které připraví váš byt či dům na prodej nebo nový pronájem. Vytvořenímu neutální atmosféry a zvýšíme atraktivitu nemovitosti.", features: ["Neutralizace těch intenzivních barev", "Příprava zdí na vysoké standardy", "Opravy a zatmelení vnitřních nedostatků", "Čisté a svěží prostředí pro prohlídky", "Rychlá realizace — 1–2 dny", "Zvýšíme cenu pronájmu nebo prodeje"], process: [{ step: "Obhlídka", desc: "Posouzení stavu a potřeb", icon: Send }, { step: "Strategie", desc: "Doporučení barev a časový plán", icon: Calculator }, { step: "Realizace", desc: "Rychlé a efektivní provedení", icon: Paintbrush }, { step: "Kontrola", desc: "Finální příprava na prodej/pronájem", icon: CheckCircle2 }], priceHint: "Od 80 Kč/m²", cta: "Poptat malování na prodej" },
  "malovani-kancelari": { title: "Malování kanceláří", tag: "Komerční", image: "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F3026d95741854f52aaaf83680e170c34", heroDesc: "Profesionální malování komerčních prostor s minimálním narušením provozu. Pracujeme o víkendech i v noci.", features: ["Realizace mimo pracovní dobu", "Zero-disruption záruka", "Antigraffiti a odolné nátěry", "Korporátní barvy podle CI", "Výšková práce do 12 m", "Pojištění do 5 mil. Kč"], process: [{ step: "Konzultace", desc: "Posouzení prostor a požadavků", icon: Send }, { step: "Plán", desc: "Harmonogram s ohledem na provoz", icon: Calculator }, { step: "Realizace", desc: "Efektivní provedení", icon: Paintbrush }, { step: "Kontrola", desc: "Inspekce a dokumentace", icon: CheckCircle2 }], priceHint: "Od 75 Kč/m²", cta: "Poptat malování kanceláří" },
  "dekorativni-sterky": { title: "Dekorativní stěrky", tag: "Speciální", image: "https://images.unsplash.com/photo-1719194981461-fa0ec450999e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwY29uY3JldGUlMjBtaWNyb2NlbWVudCUyMHdhbGwlMjB0ZXh0dXJlfGVufDF8fHx8MTc3MTMyNzE1OXww&ixlib=rb-4.1.0&q=80&w=1080", heroDesc: "Vytvořte unikátní interiér. Microcement, benátský štuk a desítky moderních povrchových úprav.", features: ["Microcement (stěny, podlahy, koupelny)", "Benátský štuk — Stucco Veneziano", "Betonový efekt — Beton Ciré", "Metalické a perleťové povrchy", "Voděodolné úpravy pro wellness", "Vzorky a vizualizace zdarma"], process: [{ step: "Inspirace", desc: "Výběr materiálu a vzorování", icon: Send }, { step: "Příprava", desc: "Profesionální podkladové vrstvy", icon: Calculator }, { step: "Aplikace", desc: "Ruční nanášení ve 2–4 vrstvách", icon: Paintbrush }, { step: "Finalizace", desc: "Ochranné vrstvy a zapečetění", icon: CheckCircle2 }], priceHint: "Od 850 Kč/m²", cta: "Poptat dekorativní stěrky" },
  "opravy-a-priprava": { title: "Opravy a příprava", tag: "Příprava", image: "https://images.unsplash.com/photo-1589307693556-7286ae38293c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdhbGwlMjBwYWludCUyMHJvbGxlciUyMGZyZXNoJTIwY29hdHxlbnwxfHx8fDE3NzEzMjcxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080", heroDesc: "Kvalitní malba začíná perfektní přípravou povrchů.", features: ["Oprava prasklin a poškozených omítek", "Profesionální tmelení", "Strojní a ruční broušení", "Penetrační nátěry", "Odstranění starých nátěrů a tapet", "Sanace vlhkých stěn"], process: [{ step: "Diagnostika", desc: "Posouzení stavu podkladu", icon: Send }, { step: "Plán oprav", desc: "Specifikace materiálů", icon: Calculator }, { step: "Realizace", desc: "Systematická oprava", icon: Paintbrush }, { step: "Kontrola", desc: "Ověření kvality povrchu", icon: CheckCircle2 }], priceHint: "Od 45 Kč/m²", cta: "Poptat opravu povrchů" },
  "komercni-objekty": { title: "Komerční objekty", tag: "SVJ / Developers", image: "https://images.unsplash.com/photo-1768270181430-3e3672a32283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBsb2JieSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTMyNzE1OXww&ixlib=rb-4.1.0&q=80&w=1080", heroDesc: "Velkoplošné projekty pro SVJ, bytové domy a developery.", features: ["Malování společných prostor", "Fasádní nátěry a opravy", "Koordinace v obydlených objektech", "Etapová realizace", "Hromadné slevy pro SVJ", "Kompletní fotodokumentace"], process: [{ step: "Obhlídka", desc: "Bezplatná prohlídka objektu", icon: Send }, { step: "Nabídka", desc: "Detailní rozpočet", icon: Calculator }, { step: "Koordinace", desc: "Komunikace s SVJ", icon: Paintbrush }, { step: "Realizace", desc: "Etapové provedení", icon: CheckCircle2 }], priceHint: "Individuální kalkulace", cta: "Poptat pro SVJ / developer" },
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;
  if (!service) return <Navigate to="/sluzby" replace />;

  return (
    <>
      <section className="relative pt-24 noise-overlay overflow-hidden" style={{ background: "linear-gradient(160deg, var(--s1) 0%, var(--s3) 40%, var(--s1) 100%)" }}>
        <div className="absolute w-[500px] h-[500px] -top-[100px] -right-[100px] rounded-full blur-[200px] pointer-events-none" style={{ background: "var(--orb-accent)" }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 pt-12 pb-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/sluzby" className="inline-flex items-center gap-2 text-foreground/40 hover:text-accent transition-colors mb-8 font-sans" style={{ fontSize: "13px" }}>
              <ArrowLeft size={14} /> Zpět na služby
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end pb-16">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-accent mb-6 font-[family-name:var(--font-display)]" style={{ fontSize: "11px", fontWeight: 600 }}>{service.tag}</span>
              <h1 className="font-[family-name:var(--font-display)] text-foreground mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, lineHeight: 1.0 }}>{service.title}</h1>
              <p className="text-foreground/40 font-sans max-w-xl" style={{ fontSize: "17px", lineHeight: 1.8 }}>{service.heroDesc}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden gradient-border aspect-[4/3]"><ImageWithFallback src={service.image} alt={service.title} className="w-full h-full object-cover" /></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-foreground mb-8" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Co zahrnuje</h2>
                <div className="flex flex-col gap-4">
                  {service.features.map((f, i) => (
                    <motion.div key={f} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center mt-0.5"><Check size={12} className="text-accent" strokeWidth={2.5} /></div>
                      <span className="text-foreground/70 font-sans" style={{ fontSize: "15px", lineHeight: 1.6 }}>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-foreground mb-8" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Jak postupujeme</h2>
                <div className="flex flex-col gap-6">
                  {service.process.map((p, i) => (
                    <motion.div key={p.step} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-foreground/8 to-foreground/3 flex items-center justify-center group-hover:from-accent/20 group-hover:to-accent/5 transition-all duration-300">
                        <p.icon size={16} className="text-accent" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="block font-[family-name:var(--font-display)] text-foreground mb-0.5" style={{ fontSize: "16px", fontWeight: 600 }}>{p.step}</span>
                        <span className="text-foreground/40 font-sans" style={{ fontSize: "14px", lineHeight: 1.5 }}>{p.desc}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 p-8 rounded-2xl glass gradient-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <span className="font-[family-name:var(--font-display)] text-accent block mb-1" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Orientační ceník</span>
                  <span className="text-foreground font-[family-name:var(--font-display)]" style={{ fontSize: "20px", fontWeight: 600 }}>{service.priceHint}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to="/kalkulacka" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20" style={{ background: "linear-gradient(135deg, #b8a88a, #c08050)", fontSize: "14px", fontWeight: 600 }}>
                    {service.cta} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="tel:+420732333550" className="inline-flex items-center gap-2 px-7 py-3.5 glass rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all duration-300" style={{ fontSize: "14px", fontWeight: 500 }}>
                    <Phone size={14} /> Zavolat
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
