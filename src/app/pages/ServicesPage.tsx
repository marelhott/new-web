import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  HomeIcon,
  BuildingLibraryIcon,
  PaintBrushIcon,
  WrenchIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const faqItems = [
  {
    q: "Jak vybrat správnou službu, když si nejsem jistý?",
    a: "Pokud si nejste jistí, využijte online kalkulačku nebo nás kontaktujte. Doporučíme vhodný postup podle typu prostoru a stavu povrchů.",
  },
  {
    q: "Děláte i komerční zakázky a SVJ?",
    a: "Ano. Realizujeme kanceláře, společné prostory, komerční objekty i zakázky pro SVJ a developery včetně etapového postupu.",
  },
  {
    q: "Je možné domluvit prohlídku a přesnější nacenění?",
    a: "Ano, po úvodní poptávce domluvíme prohlídku nebo upřesnění podkladů a připravíme konkrétní nabídku.",
  },
];

/* ─── Icon helper ─── */
const getServiceIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    home: HomeIcon,
    building: BuildingLibraryIcon,
    palette: PaintBrushIcon,
    wrench: WrenchIcon,
    store: BuildingStorefrontIcon,
    users: UserGroupIcon,
  };
  return icons[iconName.toLowerCase()] || null;
};

/* ─── Reveal helper ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Services data ─── */
const allServices = [
  {
    title: "Malování bytů a domů",
    slug: "malovani-bytu",
    tag: "Rezidenční",
    iconName: "home",
    desc: "Váš domov si zaslouží to nejlepší – a my vám to rádi dopřejeme díky dokonalé výmalbě vašich osobních prostor. Od garsoniéry po rodinný dům.",
    features: [
      "Kompletní zakrytí nábytku a podlah",
      "Prémiové barvy Dulux / Caparol",
      "Poradenství při výběru barev zdarma",
    ],
    price: "Od 85 Kč/m²",
    color: "#c9982d",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F5e3db085be04449fb327c79b0ec47e1b",
  },
  {
    title: "Malování před prodejem nebo pronájmem",
    slug: "malovani-pred-prodejem",
    tag: "Osobní",
    iconName: "home",
    desc: "Příprava nemovitosti na prodej nebo pronájem vyžaduje čisté a neutrální prostředí. Zvýšíme atraktivitu vašeho bytu či domu rychlým a efektivním malováním.",
    features: [
      "Neutralizace intenzivních barev",
      "Rychlá realizace — 1–2 dny",
      "Zvýšíme atraktivitu na trhu",
    ],
    price: "Od 80 Kč/m²",
    color: "#4f9fb8",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F6f785ac818cd4504aa3ddbdcc553358c",
  },
  {
    title: "Malování kanceláří a komerčních prostor",
    slug: "malovani-kancelari",
    tag: "Komerční",
    iconName: "building",
    desc: "Reprezentativní prostředí je vizitkou každé úspěšné firmy či ordinace – a my vám ho pomůžeme vytvořit. Pracujeme mimo pracovní dobu, o víkendech i v noci.",
    features: [
      "Zero-disruption – mimo pracovní dobu",
      "Korporátní barvy dle CI",
      "Pojištění do 5 mil. Kč",
    ],
    price: "Od 75 Kč/m²",
    color: "#6b8f71",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F3026d95741854f52aaaf83680e170c34",
  },
  {
    title: "Malování pensionů, restaurací a menších hotelů",
    slug: "komercni-objekty",
    tag: "Hospitality",
    iconName: "store",
    desc: "Každý obchod, kavárna či penzion má svůj příběh – a my ho podtrhneme dokonalým vzhledem. Malujeme v termínech, které vám vyhovují.",
    features: [
      "Flexibilní termíny bez příplatků",
      "Odolné a omyvatelné nátěry",
      "Kompletní fotodokumentace",
    ],
    price: "Od 80 Kč/m²",
    color: "#c9982d",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F813e356566e0424cbba8f945a4b5a0bc",
  },
  {
    title: "Malování společných prostorů domu (SVJ)",
    slug: "malovani-svj",
    tag: "SVJ / Developers",
    iconName: "users",
    desc: "Společné prostory jsou tváří každého domu. Jsme odborníci na malování chodeb, schodišť a dalších prostor spravovaných SVJ a bytovými družstvy.",
    features: [
      "Etapová realizace v obydlených domech",
      "Hromadné slevy pro SVJ",
      "Koordinace s výborem SVJ",
    ],
    price: "Individuální",
    color: "#6b8f71",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Ffe0d5ae8e8b3454e951a42634b8be26d",
  },
  {
    title: "Dekorativní úprava zdí",
    slug: "dekorativni-sterky",
    tag: "Speciální",
    iconName: "palette",
    desc: "Microcement, benátský štuk, betonový efekt a desítky dalších moderních povrchových úprav. Unikátní interiéry s precizním řemeslem a důrazem na jedinečnost.",
    features: [
      "Microcement a benátský štuk",
      "Vzorky a vizualizace zdarma",
      "Voděodolné úpravy pro wellness",
    ],
    price: "Od 850 Kč/m²",
    color: "#b8a88a",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fc56ff688f14e45aabf5bbee2d3fe87bc",
  },
];

/* ─── Page ─── */
export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const selectedService = allServices[activeService] ?? allServices[0];

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-32 pb-20 noise-overlay overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #ffffff 0%, #f4f8ff 46%, #ffffff 100%)",
        }}
      >
        <div
          className="absolute w-[600px] h-[600px] -top-[200px] -right-[100px] rounded-full blur-[200px] animate-float-slow pointer-events-none"
          style={{ background: "rgba(37,99,235,0.12)" }}
        />
        <div
          className="absolute w-[400px] h-[400px] bottom-0 -left-[100px] rounded-full blur-[150px] animate-float-reverse pointer-events-none"
          style={{ background: "rgba(124,58,237,0.08)" }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-6 block"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              Naše služby
            </span>
            <h1
              className="font-[family-name:var(--font-display)] text-foreground mb-6"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 700,
                lineHeight: 1.0,
              }}
            >
              Kompletní malířské
              <br />
              <span className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
                služby
              </span>
            </h1>
            <p
              className="font-sans max-w-xl"
              style={{ fontSize: "17px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}
            >
              Od klasického malování bytů přes kanceláře, SVJ a komerční
              prostory až po dekorativní techniky. Vše čistě, precizně a za
              předem dohodnutou cenu.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        className="relative py-12 noise-overlay"
        style={{
          background:
            "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)",
        }}
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="rounded-[14px] p-8 md:p-10" style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}>
              <h2 className="font-[family-name:var(--font-display)] text-foreground mb-5" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.08 }}>
                Jaké malířské práce zajišťujeme v Praze a okolí
              </h2>
              <p className="font-sans mb-4" style={{ fontSize: "16px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>
                Nejčastěji poptávané je malování bytů, pokojů a kanceláří v Praze, ale realizujeme také malování restaurací, penzionů, společných prostor bytových domů a speciální dekorativní stěrky. Každá služba má vlastní detail, ceníkový rámec i doporučený postup.
              </p>
              <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>
                Pokud si nejste jistí správným řešením, začněte u <Link to="/kalkulacka" className="text-accent underline underline-offset-4">online kalkulačky malování</Link> nebo přejděte přímo na <Link to="/kontakt" className="text-accent underline underline-offset-4">kontakt</Link>. U rozsáhlejších zakázek pro SVJ, kanceláře nebo developery připravíme individuální nabídku.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div className="rounded-[12px] px-5 py-4" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(15,23,42,0.06)" }}>
                  <h3 className="mb-2" style={{ fontFamily: "'Sora', sans-serif", fontSize: "17px", fontWeight: 700, letterSpacing: "-0.03em", color: "#0f172a" }}>
                    Malování pokojů a bytů v Praze
                  </h3>
                  <p className="m-0 font-sans" style={{ fontSize: "14px", lineHeight: 1.7, color: "#526071", fontWeight: 500 }}>
                    Pro menší i větší byty, rodinné domy a běžné rezidenční zakázky nejčastěji doporučujeme <Link to="/sluzby/malovani-bytu" className="text-accent underline underline-offset-4">malování bytů a pokojů</Link> nebo <Link to="/sluzby/malovani-pred-prodejem" className="text-accent underline underline-offset-4">malování před prodejem</Link>.
                  </p>
                </div>
                <div className="rounded-[12px] px-5 py-4" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(15,23,42,0.06)" }}>
                  <h3 className="mb-2" style={{ fontFamily: "'Sora', sans-serif", fontSize: "17px", fontWeight: 700, letterSpacing: "-0.03em", color: "#0f172a" }}>
                    Kanceláře, SVJ a komerční prostory
                  </h3>
                  <p className="m-0 font-sans" style={{ fontSize: "14px", lineHeight: 1.7, color: "#526071", fontWeight: 500 }}>
                    Pro firmy, výbory SVJ a provozovatele objektů máme samostatné služby pro <Link to="/sluzby/malovani-kancelari" className="text-accent underline underline-offset-4">malování kanceláří</Link>, <Link to="/sluzby/malovani-svj" className="text-accent underline underline-offset-4">společné prostory domu</Link> a <Link to="/sluzby/komercni-objekty" className="text-accent underline underline-offset-4">komerční objekty</Link>.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES SHOWCASE ── */}
      <section
        className="relative py-20 noise-overlay"
        style={{
          background:
            "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="text-center mb-14">
              <span
                className="inline-flex items-center justify-center min-h-[36px] px-5 py-2 rounded-2xl mb-6"
                style={{ background: "#28282c", color: "#fff", fontSize: "15px", fontWeight: 500 }}
              >
                Služby
              </span>
              <h2
                className="font-[family-name:var(--font-display)] text-foreground"
                style={{ fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                Co děláme
              </h2>
              <p
                className="font-sans max-w-3xl mx-auto mt-5"
                style={{ fontSize: "20px", lineHeight: 1.5, color: "#3d3d47", fontWeight: 500 }}
              >
                Vyberte si službu, která nejlépe odpovídá vašemu prostoru a rozsahu prací.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(320px,610px)_minmax(320px,1fr)] gap-12 xl:gap-20 items-start">
              <div className="w-full">
                <div className="overflow-hidden rounded-[10px]">
                  <ImageWithFallback
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover aspect-[610/686]"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="w-full">
                {allServices.map((service, index) => {
                  const isActive = index === activeService;
                  const Icon = getServiceIcon(service.iconName);

                  return (
                    <article
                      key={service.slug}
                      className="border-b"
                      style={{ borderColor: "#dbdad9" }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveService(index)}
                        className="w-full h-20 flex items-center justify-between gap-5 text-left"
                        aria-expanded={isActive}
                      >
                        <span className="flex items-center gap-5 min-w-0">
                          {Icon ? <Icon className="w-10 h-10 text-[#2563eb]" /> : null}
                          <span
                            style={{ fontSize: "22px", lineHeight: "30.8px", fontWeight: 500, letterSpacing: "-0.2px", color: "#101014" }}
                          >
                            {service.title}
                          </span>
                        </span>
                        <span className="relative block w-6 h-6 flex-shrink-0" aria-hidden="true">
                          <span
                            className="absolute left-1/2 top-1/2 h-[1.75px] w-6 rounded-full"
                            style={{ background: "#101014", transform: isActive ? "translate(-50%, -50%) rotate(45deg)" : "translate(-50%, -50%)" }}
                          />
                          <span
                            className="absolute left-1/2 top-1/2 h-[1.75px] w-6 rounded-full"
                            style={{ background: "#101014", transform: isActive ? "translate(-50%, -50%) rotate(-45deg)" : "translate(-50%, -50%) rotate(90deg)" }}
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isActive ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-8">
                              <p
                                className="font-sans max-w-[550px]"
                                style={{ fontSize: "18px", lineHeight: "27px", letterSpacing: "-0.1px", color: "#3d3d47" }}
                              >
                                {service.desc}
                              </p>
                              <div className="mt-5 flex flex-wrap gap-3">
                                {service.features.map((feature) => (
                                  <span
                                    key={feature}
                                    className="inline-flex items-center rounded-2xl px-3 py-2"
                                    style={{ background: "rgba(15,23,42,0.04)", color: "#3d3d47", fontSize: "13px", fontWeight: 600 }}
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-6 flex flex-wrap items-center gap-4">
                                <span
                                  style={{ color: "#101014", fontSize: "15px", fontWeight: 700 }}
                                >
                                  {service.price}
                                </span>
                                <Link
                                  to={`/sluzby/${service.slug}`}
                                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-white transition-all duration-300"
                                  style={{ background: "#2563eb", fontSize: "13px", fontWeight: 700 }}
                                >
                                  Detail služby
                                  <ArrowUpRightIcon className="w-4 h-4" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </article>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section
        className="relative py-20 noise-overlay"
        style={{
          background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <Reveal>
            <h2
              className="font-[family-name:var(--font-display)] text-foreground mb-6"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
              }}
            >
              Nevíte, jakou službu potřebujete?
            </h2>
            <p
              className="text-foreground/50 font-sans mb-10 max-w-lg mx-auto"
              style={{ fontSize: "16px", lineHeight: 1.7 }}
            >
              Použijte naši online kalkulačku a spočítejte si cenu předem — nebo
              nám zavolejte a poradíme.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/kalkulacka"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Online kalkulačka{" "}
                <ArrowRightIcon
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to="/kontakt"
                className="inline-flex items-center px-8 py-4 rounded-full transition-all duration-300" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(15,23,42,0.08)", color: "#334155", fontSize: "15px", fontWeight: 700, fontFamily: "'Manrope', var(--font-sans)" }}
                
              >
                Kontaktovat nás
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="relative py-16 noise-overlay"
        style={{ background: "linear-gradient(180deg, var(--s2) 0%, var(--s1) 100%)" }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="text-center mb-10">
              <span
                className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4 block"
                style={{ fontSize: "12px", fontWeight: 600 }}
              >
                FAQ
              </span>
              <h2
                className="font-[family-name:var(--font-display)] text-foreground"
                style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700 }}
              >
                Časté dotazy ke službám
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {faqItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <article className="rounded-[24px] p-6" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 14px 36px rgba(15,23,42,0.04)" }}>
                  <h3 className="mb-3" style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.035em", color: "#0f172a" }}>
                    {item.q}
                  </h3>
                  <p className="font-sans" style={{ fontSize: "15px", lineHeight: 1.74, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>
                    {item.a}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
