import { useState, useRef } from "react";
import React from "react";
import { motion, useInView } from "motion/react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, PaperAirplaneIcon, CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const getContactIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{className?: string}>> = {
    phone: PhoneIcon,
    mail: EnvelopeIcon,
    mappin: MapPinIcon,
    clock: ClockIcon,
  };
  return icons[iconName.toLowerCase()] || null;
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const contactInfo = [
  { iconName: "phone", label: "Telefon", value: "+420 732 333 550", href: "tel:+420732333550", desc: "Po–Pá 7:00–18:00" },
  { iconName: "mail", label: "E-mail", value: "info@malirivcernem.cz", href: "mailto:info@malirivcernem.cz", desc: "Odpovíme do 2 hodin" },
  { iconName: "mappin", label: "Adresa", value: "Praha, Česká republika", href: "#", desc: "Působíme v celé Praze" },
  { iconName: "clock", label: "Pracovní doba", value: "Po–Pá: 7:00 – 18:00", href: "#", desc: "Víkendové termíny po domluvě" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const inputClass = "w-full px-5 py-4 rounded-xl border border-foreground/8 bg-foreground/3 text-foreground font-sans transition-all duration-300 focus:border-accent/50 focus:bg-foreground/5 focus:outline-none focus:shadow-lg focus:shadow-accent/5 placeholder:text-foreground/20";

  return (
    <>
      <section className="relative pt-32 pb-20 noise-overlay overflow-hidden" style={{ background: "linear-gradient(160deg, #ffffff 0%, #f4f8ff 50%, #ffffff 100%)" }}>
        <div className="absolute inset-0 z-0 opacity-[0.06]">
          <ImageWithFallback src="https://images.unsplash.com/photo-1698637644147-54099497b214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQcmFndWUlMjBvbGQlMjB0b3duJTIwYWVyaWFsJTIwcGFub3JhbWElMjBldmVuaW5nfGVufDF8fHx8MTc3MTMyOTY1Mnww&ixlib=rb-4.1.0&q=80&w=1080" alt="Praha" className="w-full h-full object-cover" />
        </div>
        <div className="absolute w-[600px] h-[600px] -top-[200px] -right-[100px] rounded-full blur-[200px] pointer-events-none z-[2]" style={{ background: "rgba(37,99,235,0.10)" }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-6 block" style={{ fontSize: "12px", fontWeight: 600 }}>Kontakt</span>
            <h1 className="font-[family-name:var(--font-display)] text-foreground mb-6" style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.0 }}>
              Ozvěte se<br /><span className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">nám</span>
            </h1>
            <p className="font-sans max-w-xl" style={{ fontSize: "17px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>Máte dotaz, chcete nezávaznou nabídku nebo se prostě jen potřebujete poradit?</p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {contactInfo.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a href={c.href} className="group block p-6 rounded-[26px] transition-all duration-500 hover:-translate-y-1" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 16px 40px rgba(15,23,42,0.05)" }}>
                  <div className="w-10 h-10 rounded-[14px] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.08))", border: "1px solid rgba(37,99,235,0.14)" }}>{getContactIcon(c.iconName) && React.createElement(getContactIcon(c.iconName)!, { className: "w-4.5 h-4.5 text-[#2563eb]" })}</div>
                  <span className="block mb-1" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7b8794", fontFamily: "'Manrope', var(--font-sans)" }}>{c.label}</span>
                  <span className="block mb-1" style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}>{c.value}</span>
                  <span className="font-sans" style={{ fontSize: "12px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}>{c.desc}</span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <Reveal>
                <div className="p-8 md:p-10 rounded-[28px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 18px 48px rgba(15,23,42,0.05)" }}>
                  {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563eb]/20 to-[#4f46e5]/10 flex items-center justify-center mx-auto mb-6"><CheckCircleIcon className="w-7 h-7 text-[#2563eb]" /></div>
                      <h3 className="font-[family-name:var(--font-display)] text-foreground mb-3" style={{ fontSize: "24px", fontWeight: 600 }}>Děkujeme za zprávu!</h3>
                      <p className="font-sans max-w-md mx-auto" style={{ fontSize: "15px", lineHeight: 1.72, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>Ozveme se vám do 2 hodin v pracovní dny.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h3 className="font-[family-name:var(--font-display)] text-foreground mb-2" style={{ fontSize: "22px", fontWeight: 600 }}>Napište nám</h3>
                      <p className="font-sans mb-8" style={{ fontSize: "14px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}>Odpovíme do 2 hodin v pracovní dny.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Jméno *</label>
                          <input type="text" required placeholder="Vaše jméno" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} style={{ fontSize: "14px" }} />
                        </div>
                        <div>
                          <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>E-mail *</label>
                          <input type="email" required placeholder="vas@email.cz" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} style={{ fontSize: "14px" }} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Telefon</label>
                          <input type="tel" placeholder="+420 ..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} style={{ fontSize: "14px" }} />
                        </div>
                        <div>
                          <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Typ poptávky</label>
                          <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ fontSize: "14px" }}>
                            <option value="">Vyberte...</option>
                            <option value="byt">Malování bytu</option>
                            <option value="kancelar">Malování kanceláří</option>
                            <option value="sterky">Dekorativní stěrky</option>
                            <option value="svj">SVJ / Developers</option>
                            <option value="jine">Jiné</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-8">
                        <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Zpráva *</label>
                        <textarea required rows={5} placeholder="Popište váš projekt..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} resize-none`} style={{ fontSize: "14px" }} />
                      </div>
                      <button type="submit" className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20" style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", fontSize: "15px", fontWeight: 600 }}>
                        <PaperAirplaneIcon className="w-4 h-4" /> Odeslat poptávku <ArrowRightIcon className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-[96px]">
                <Reveal delay={0.15}>
                  <div className="p-8 rounded-[26px] mb-5" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 16px 40px rgba(15,23,42,0.05)" }}>
                    <h4 className="font-[family-name:var(--font-display)] text-foreground mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }}>Proč nás kontaktovat?</h4>
                    <div className="flex flex-col gap-3">
                      {["Bezplatná konzultace a prohlídka", "Přesná kalkulace do 24 hodin", "Pojištění odpovědnosti do 5 mil. Kč", "Reference od 1 000+ klientů"].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0"><CheckCircleIcon className="w-3 h-3 text-accent" strokeWidth={3} /></div>
                          <span className="font-sans" style={{ fontSize: "13px", color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.25}>
                  <div className="p-8 rounded-[26px] overflow-hidden relative" style={{ background: "linear-gradient(135deg, #eff6ff, #eef2ff)", border: "1px solid rgba(37,99,235,0.12)", boxShadow: "0 18px 46px rgba(37,99,235,0.08)" }}>
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(37,99,235,0.12)" }} />
                    <div className="relative z-10">
                      <h4 className="mb-3" style={{ fontSize: "18px", fontWeight: 600 }}>Rychlá kalkulace</h4>
                      <p className="font-sans mb-6" style={{ fontSize: "14px", lineHeight: 1.68, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>Spočítejte si orientační cenu online ihned.</p>
                      <a href="/kalkulacka" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20" style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", fontSize: "13px", fontWeight: 700, fontFamily: "'Manrope', var(--font-sans)", letterSpacing: "0.03em" }}>
                        Online kalkulačka <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
