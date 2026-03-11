import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Ruler,
  Banknote,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* ─── Reveal ─── */
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
type Project = {
  id: number;
  title: string;
  category: string;
  tag: string;
  location: string;
  area: string;
  duration: string;
  price: string;
  date: string;
  desc: string;
  longDesc: string;
  tasks: string[];
  cover: string;
  gallery: string[];
};

const filters = [
  "Vše",
  "Byty",
  "Domy",
  "Kanceláře",
  "Chodby a schodiště",
  "Stěrky",
  "Hotel",
  "Kavárna",
];

const projects: Project[] = [
  {
    id: 1,
    title: "Byt 3+kk Vinohrady",
    category: "Byty",
    tag: "Rezidenční",
    location: "Praha 2 – Vinohrady",
    area: "92 m²",
    duration: "4 dny",
    price: "38 500 Kč",
    date: "Březen 2026",
    desc: "Kompletní výmalba bytu 3+kk v prvorepublikovém činžovním domě na Vinohradech. Stropy 3,2 m, štuková výzdoba.",
    longDesc:
      "Klient požadoval kompletní obnovu výmalby v celém bytě včetně chodby a koupelny. Štuky na stropech byly nejprve pečlivě očištěny a otmeleny, praskliny v omítkách sanovány. Použili jsme prémiovou barvu Caparol Indeko Plus ve třech teplých odstínech — obývací pokoj v jemném béžovém tónu, ložnice v uklidňující šedozelené a dětský pokoj v hravé pastelové. Celý byt byl zakryt fóliemi včetně dřevěných podlah, které jsme po dokončení kompletně vyčistili.",
    tasks: [
      "Zakrytí nábytku a podlah",
      "Sanace prasklin v omítkách",
      "Oprava štukové výzdoby na stropech",
      "Penetrace všech stěn a stropů",
      "Malování 2× vrstva Caparol Indeko Plus",
      "Finální úklid celého bytu",
    ],
    cover:
      "https://images.unsplash.com/photo-1761330439671-a7f20c285c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tJTIwd2hpdGUlMjB3YWxscyUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcxMzQzODc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1545165375-583920dc2f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwZnJlc2hseSUyMHBhaW50ZWQlMjB3YWxsc3xlbnwxfHx8fDE3NzEzNDM4Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1634672050277-16639332c727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjB3aGl0ZSUyMGNsZWFufGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1751879886435-e6436fd5bda4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaGx5JTIwcGFpbnRlZCUyMGNoaWxkcmVuJTIwcm9vbSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MTM0Mzg4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 2,
    title: "Rodinný dům Černošice",
    category: "Domy",
    tag: "Rezidenční",
    location: "Černošice u Prahy",
    area: "240 m²",
    duration: "8 dní",
    price: "72 000 Kč",
    date: "Únor 2026",
    desc: "Kompletní výmalba dvoupatrového rodinného domu po rekonstrukci. 7 místností, schodiště, chodby.",
    longDesc:
      "Po celkové rekonstrukci rodinného domu jsme provedli kompletní výmalbu všech prostor včetně schodiště a technické místnosti. Nové sádrokartonové příčky vyžadovaly speciální přípravu — bandážování spojů, dvojité tmelení a jemné broušení. V obývacím pokoji s krbem jsme aplikovali tepelně odolný nátěr v okolí komína. Klient si přál minimalistickou paletu v odstínech bílé a světle šedé s jednou akcentní stěnou v obývacím pokoji v odstínu Deep Navy.",
    tasks: [
      "Příprava nových SDK povrchů (bandáž, tmel, brus)",
      "Penetrace a základní nátěr všech místností",
      "Malování stěn a stropů — 14 místností",
      "Tepelně odolný nátěr okolí krbu",
      "Akcentní stěna v obývacím pokoji",
      "Nátěry dřevěných rámů oken a dveří",
      "Závěrečný úklid a předání",
    ],
    cover:
      "https://images.unsplash.com/photo-1654939655317-c38553fb03f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGludGVyaW9yJTIwcGFpbnRpbmclMjByZW5vdmF0aW9ufGVufDF8fHx8MTc3MTM0Mzg3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1605538794065-dd2671432ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob3VzZSUyMGV4dGVyaW9yJTIwUHJhZ3VlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MTM0Mzg4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1761330439671-a7f20c285c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tJTIwd2hpdGUlMjB3YWxscyUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcxMzQzODc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwcmVub3ZhdGlvbiUyMHRpbGVzfGVufDF8fHx8MTc3MTM0Mzg3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 3,
    title: "Kanceláře IT firmy Karlín",
    category: "Kanceláře",
    tag: "Komerční",
    location: "Praha 8 – Karlín",
    area: "420 m²",
    duration: "5 dní (víkend + noční směny)",
    price: "89 000 Kč",
    date: "Leden 2026",
    desc: "Open-space kanceláře technologické firmy. Realizace přes víkend s minimálním narušením provozu.",
    longDesc:
      "Technologická firma v karlínském business parku potřebovala kompletní přemalování open-space kanceláře, 4 meetingových místností a vstupní recepce. Klíčovým požadavkem bylo dokončení přes víkend, aby v pondělí mohli zaměstnanci normálně pracovat. Nasadili jsme tým 6 malířů ve dvou směnách (pátek večer – neděle odpoledne). Barvy byly zvoleny podle korporátní identity klienta — neutrální šedá s akcentními stěnami v brandové modré. Meetingové místnosti dostaly magnetický nátěr pro psaní fixem.",
    tasks: [
      "Zakrytí veškeré elektroniky a nábytku",
      "Oprava poškozených míst od kotvení nábytku",
      "Malování open-space — 280 m² stěn",
      "4× meetingová místnost s magnetickým nátěrem",
      "Recepce s korporátní modrou akcentní stěnou",
      "Kompletní úklid a odvětrání do pondělí",
    ],
    cover:
      "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBpbnRlcmlvciUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzEyOTA0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1761818645915-260598d569a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwcGxhbiUyMG9mZmljZSUyMGNvd29ya2luZyUyMHNwYWNlJTIwbW9kZXJufGVufDF8fHx8MTc3MTM0Mzg4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1771147445405-153493dca398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb3JyaWRvciUyMGhhbGx3YXklMjBtb2Rlcm4lMjBsaWdodGluZ3xlbnwxfHx8fDE3NzEzNDM4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1574911460152-cfa027a6ea8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBvZmZpY2UlMjBjbGVhbiUyMHdoaXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQzODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 4,
    title: "SVJ Biskupcova 18",
    category: "Chodby a schodiště",
    tag: "SVJ",
    location: "Praha 3 – Žižkov",
    area: "680 m²",
    duration: "12 dní (etapově)",
    price: "124 000 Kč",
    date: "Prosinec 2025",
    desc: "Malování společných prostor bytového domu — 6 pater schodiště, chodby, sklepy a vstupní vestibul.",
    longDesc:
      "Bytový dům z 30. let s 24 bytovými jednotkami potřeboval kompletní obnovu společných prostor. Práce probíhaly etapově — vždy dvě patra najednou, aby obyvatelé mohli normálně používat schodiště. Vstupní vestibul s původní mozaikovou dlažbou dostal speciální péči — štuky byly restaurovány a natřeny v původním odstínu. Schodišťové stěny byly opatřeny omyvatelným nátěrem Primalex Polar do výšky 1,5 m pro snadnou údržbu. Sklepní prostory byly ošetřeny protiplísňovým nátěrem.",
    tasks: [
      "Očištění a oprava omítek na schodišti",
      "Restaurování štukové výzdoby ve vestibulu",
      "Protiplísňový nátěr sklepních prostor",
      "Omyvatelný nátěr schodiště do výšky 1,5 m",
      "Malování stropů na schodišti — 6 pater",
      "Nátěr zábradlí a dveřních rámů",
      "Etapová realizace bez omezení provozu",
    ],
    cover:
      "https://images.unsplash.com/photo-1768321910296-004afb7228cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHN0YWlyY2FzZSUyMGhhbGx3YXklMjByZW5vdmF0aW9ufGVufDF8fHx8MTc3MTM0Mzg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1758448721149-aa0ce8e1b2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZW50cmFuY2UlMjBsb2JieSUyMG1vZGVybnxlbnwxfHx8fDE3NzEzNDM4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1768321910296-004afb7228cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHN0YWlyY2FzZSUyMGhhbGx3YXklMjByZW5vdmF0aW9ufGVufDF8fHx8MTc3MTM0Mzg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1771147445405-153493dca398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb3JyaWRvciUyMGhhbGx3YXklMjBtb2Rlcm4lMjBsaWdodGluZ3xlbnwxfHx8fDE3NzEzNDM4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 5,
    title: "Microcement loft Holešovice",
    category: "Stěrky",
    tag: "Speciální",
    location: "Praha 7 – Holešovice",
    area: "65 m² stěn + 40 m² podlahy",
    duration: "10 dní",
    price: "185 000 Kč",
    date: "Listopad 2025",
    desc: "Microcementová stěrka na stěnách a podlaze v loftovém bytě. Industriální betonový look ve 4 vrstvách.",
    longDesc:
      "Mladý pár v holešovickém loftu chtěl autentický industriální vzhled bez kompromisů na komfortu. Aplikovali jsme microcement Topciment Sttandard ve 4 vrstvách na stěny obývacího pokoje a koupelny, plus microcementovou podlahu v celém open-space prostoru. Podlahová stěrka byla opatřena polyuretanovým lakem ve 2 vrstvách pro maximální odolnost. V koupelně jsme použili vodotěsný systém s hydroizolační membránou. Výsledný efekt — hladký betonový monolitický povrch v teplém šedém odstínu.",
    tasks: [
      "Příprava podkladu — broušení, vyrovnání",
      "Hydroizolační membrána v koupelně",
      "Microcement Topciment — 4 vrstvy stěny",
      "Microcementová podlaha — 3 vrstvy + lak",
      "Polyuretanový ochranný lak 2× vrstva",
      "Finální leštění a impregnace",
    ],
    cover:
      "https://images.unsplash.com/photo-1758801305613-5e26c5e5aa0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2NlbWVudCUyMGNvbmNyZXRlJTIwd2FsbCUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc3MTM0Mzg4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1748636023571-7d3f1b9a8edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGxhc3RlciUyMHZlbmV0aWFuJTIwc3R1Y2NvJTIwd2FsbCUyMHRleHR1cmV8ZW58MXx8fHwxNzcxMzQzODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwcmVub3ZhdGlvbiUyMHRpbGVzfGVufDF8fHx8MTc3MTM0Mzg3OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758801305613-5e26c5e5aa0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2NlbWVudCUyMGNvbmNyZXRlJTIwd2FsbCUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc3MTM0Mzg4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 6,
    title: "Hotel & Wellness Na Slupi",
    category: "Hotel",
    tag: "Hospitality",
    location: "Praha 2 – Nové Město",
    area: "1 200 m²",
    duration: "18 dní",
    price: "310 000 Kč",
    date: "Říjen 2025",
    desc: "Kompletní renovace výmalby boutique hotelu — 22 pokojů, lobby, restaurace a wellness zóna.",
    longDesc:
      "Boutique hotel Na Slupi procházel celkovou renovací interiéru. Naším úkolem bylo kompletní přemalování 22 hotelových pokojů, vstupní lobby s recepcí, hotelové restaurace a wellness zóny. Každý pokoj dostal individuální barevnou paletu v rámci tří kolekcí (Earth, Water, Forest). Lobby bylo natřeno v teplém pískovém odstínu s měděnými akcentními pruhy. Ve wellness zóně jsme aplikovali speciální voděodolný nátěr odolný vlhkosti a páře. Práce probíhaly po patrech, aby hotel mohl částečně fungovat.",
    tasks: [
      "22× hotelový pokoj — individuální barevné palety",
      "Lobby a recepce — písková barva + měděné akcentní pruhy",
      "Restaurace — tmavě zelená s dřevěnými obklady",
      "Wellness zóna — voděodolný nátěr",
      "Chodby a schodiště — omyvatelný nátěr",
      "Protipožární nátěry ocelových konstrukcí",
      "Realizace po patrech bez uzavření hotelu",
    ],
    cover:
      "https://images.unsplash.com/photo-1759264244746-140bbbc54e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwcm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3MTM0Mzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1758193783649-13371d7fb8dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5JTIwcmVjZXB0aW9uJTIwbHV4dXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQzODgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1759264244746-140bbbc54e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwcm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3MTM0Mzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwcmVub3ZhdGlvbiUyMHRpbGVzfGVufDF8fHx8MTc3MTM0Mzg3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 7,
    title: "Kavárna Místo, Letná",
    category: "Kavárna",
    tag: "Hospitality",
    location: "Praha 7 – Letná",
    area: "85 m²",
    duration: "3 dny",
    price: "42 000 Kč",
    date: "Září 2025",
    desc: "Kompletní přemalování kavárny s důrazem na barevný koncept a odolnost nátěrů v provozu.",
    longDesc:
      "Majitelé oblíbené letenské kavárny chtěli osvěžit interiér novým barevným konceptem, který podtrhne útulnou atmosféru. Hlavní stěna za barem dostala hluboký terrakotový odstín, boční stěny zůstaly v teplé krémové. Strop jsme natřeli v kontrastní tmavé antracitové, což opticky snížilo prostor a dodalo intimní charakter. Všechny povrchy byly opatřeny omyvatelným nátěrem kategorie 1 (dle ČSN EN 13300) pro snadnou údržbu v gastronomickém provozu. Práce proběhly od neděle večer do středy rána.",
    tasks: [
      "Barový pult a zázemí — zakrytí a ochrana",
      "Akcentní stěna za barem — terrakotový odstín",
      "Boční stěny — teplá krémová 2× vrstva",
      "Strop — antracitový nátěr pro intimní atmosféru",
      "Omyvatelné nátěry kategorie 1 na všech plochách",
      "Realizace mimo provozní dobu (ne–st)",
    ],
    cover:
      "https://images.unsplash.com/photo-1765894711185-63800b16dbba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBjb3p5fGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1767393909805-c61c5502a4bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY291bnRlciUyMGJhciUyMGludGVyaW9yJTIwd2FybXxlbnwxfHx8fDE3NzEzNDM4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1765894711185-63800b16dbba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBjb3p5fGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1634672050277-16639332c727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjB3aGl0ZSUyMGNsZWFufGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 8,
    title: "Penthouse Smíchov City",
    category: "Byty",
    tag: "Rezidenční",
    location: "Praha 5 – Smíchov",
    area: "180 m²",
    duration: "6 dní",
    price: "95 000 Kč",
    date: "Srpen 2025",
    desc: "Luxusní penthouse s výhledem na Prahu. Prémiové barvy, akcentní stěny a dekorativní prvky.",
    longDesc:
      "Majitel nového penthouse v projektu Smíchov City požadoval prémiovou výmalbu odpovídající standardu nemovitosti. V hlavním obytném prostoru s panoramatickými okny jsme použili Farrow & Ball Ammonite — jemný teplý tón, který krásně pracuje s přirozeným světlem. Ložnice dostala uklidňující Farrow & Ball Hague Blue jako akcentní stěnu za postelí. Vstupní hala s vysokým stropem (4,5 m) vyžadovala práci z lešení. Koupelny byly opatřeny speciálním nátěrem proti vlhkosti.",
    tasks: [
      "Práce z lešení — vstupní hala 4,5 m strop",
      "Prémiové barvy Farrow & Ball — 5 odstínů",
      "Akcentní stěna Hague Blue v ložnici",
      "Nátěr stropů v celém bytě",
      "Koupelny — speciální vlhkostní nátěr",
      "Zakrytí panoramatických oken a podlahového vytápění",
    ],
    cover:
      "https://images.unsplash.com/photo-1758448756350-3d0eec02ba37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBjaXR5JTIwdmlldyUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxMzQzODg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1545165375-583920dc2f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwZnJlc2hseSUyMHBhaW50ZWQlMjB3YWxsc3xlbnwxfHx8fDE3NzEzNDM4Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwcmVub3ZhdGlvbiUyMHRpbGVzfGVufDF8fHx8MTc3MTM0Mzg3OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1634672050277-16639332c727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjB3aGl0ZSUyMGNsZWFufGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 9,
    title: "Stomatologická klinika DentPro",
    category: "Kanceláře",
    tag: "Komerční",
    location: "Praha 4 – Nusle",
    area: "160 m²",
    duration: "3 dny (víkend)",
    price: "52 000 Kč",
    date: "Červenec 2025",
    desc: "Malování zubní kliniky s 5 ordinacemi. Antibakteriální nátěry, realizace přes víkend.",
    longDesc:
      "Stomatologická klinika s pěti ordinacemi, čekárnou a zázemím vyžadovala speciální přístup — antibakteriální nátěry certifikované pro zdravotnická zařízení, absolutní čistota během realizace a dokončení přes víkend, aby v pondělí mohli přijímat pacienty. Použili jsme Caparol Sylitol Bio Innenfarbe s antibakteriální certifikací. Čekárna dostala uklidňující pastelové odstíny, ordinace čistou bílou pro optimální barevné vnímání při práci se zuby.",
    tasks: [
      "Zakrytí a ochrana zdravotnického vybavení",
      "Antibakteriální nátěr Caparol Sylitol Bio",
      "5× ordinace — čistá bílá pro barevnou věrnost",
      "Čekárna — pastelové uklidňující tóny",
      "Zázemí a sociální zařízení",
      "Kompletní desinfekce a úklid do pondělí",
    ],
    cover:
      "https://images.unsplash.com/photo-1574911460152-cfa027a6ea8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBvZmZpY2UlMjBjbGVhbiUyMHdoaXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQzODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1771147445405-153493dca398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb3JyaWRvciUyMGhhbGx3YXklMjBtb2Rlcm4lMjBsaWdodGluZ3xlbnwxfHx8fDE3NzEzNDM4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1574911460152-cfa027a6ea8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBvZmZpY2UlMjBjbGVhbiUyMHdoaXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQzODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBpbnRlcmlvciUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzEyOTA0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 10,
    title: "Benátský štuk vila Troja",
    category: "Stěrky",
    tag: "Speciální",
    location: "Praha – Troja",
    area: "38 m² stěn",
    duration: "7 dní",
    price: "145 000 Kč",
    date: "Červen 2025",
    desc: "Ruční aplikace benátského štuku Stucco Veneziano v reprezentativní hale rodinné vily.",
    longDesc:
      "Majitel vily v Troji si přál v reprezentativní vstupní hale s 5 m stropem autentický benátský štuk v teplém zlatavém odstínu. Aplikovali jsme tradiční Stucco Veneziano ve 5 vrstvách s postupným leštěním každé vrstvy ocelovým hladítkem. Finální povrch má charakteristický hloubkový lesk a mramorový efekt. Na závěr jsme nanesli přírodní včelí vosk, který chrání povrch a dodává mu hedvábný dotek. Práce vyžadovala absolutní preciznost — každá vrstva musela schnout 12 hodin.",
    tasks: [
      "Příprava podkladu — vyrovnání a penetrace",
      "Stucco Veneziano — 5 vrstev ruční aplikace",
      "Leštění každé vrstvy ocelovým hladítkem",
      "Barevná gradace — 3 tóny zlatavé",
      "Finální vrstva přírodního včelího vosku",
      "Práce z lešení — stropy 5 m",
    ],
    cover:
      "https://images.unsplash.com/photo-1748636023571-7d3f1b9a8edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGxhc3RlciUyMHZlbmV0aWFuJTIwc3R1Y2NvJTIwd2FsbCUyMHRleHR1cmV8ZW58MXx8fHwxNzcxMzQzODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1758801305613-5e26c5e5aa0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2NlbWVudCUyMGNvbmNyZXRlJTIwd2FsbCUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc3MTM0Mzg4MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1654939655317-c38553fb03f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGludGVyaW9yJTIwcGFpbnRpbmclMjByZW5vdmF0aW9ufGVufDF8fHx8MTc3MTM0Mzg3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1748636023571-7d3f1b9a8edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGxhc3RlciUyMHZlbmV0aWFuJTIwc3R1Y2NvJTIwd2FsbCUyMHRleHR1cmV8ZW58MXx8fHwxNzcxMzQzODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

/* ─── Detail modal ─── */
function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [currentImg, setCurrentImg] = useState(0);
  const allImages = [project.cover, ...project.gallery];

  const next = useCallback(
    () => setCurrentImg((c) => (c + 1) % allImages.length),
    [allImages.length]
  );
  const prev = useCallback(
    () => setCurrentImg((c) => (c - 1 + allImages.length) % allImages.length),
    [allImages.length]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[900px] mx-4 my-8 sm:my-16 rounded-2xl overflow-hidden"
        style={{ background: "var(--background)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Gallery */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={allImages[currentImg]}
                alt={`${project.title} — foto ${currentImg + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Nav arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentImg
                    ? "bg-white w-6"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Tag */}
          <div className="absolute top-4 left-4 z-20">
            <span
              className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white/90 font-[family-name:var(--font-display)]"
              style={{ fontSize: "11px", fontWeight: 600 }}
            >
              {project.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-10">
          <h2
            className="font-[family-name:var(--font-display)] text-foreground mb-2"
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h2>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 mb-8">
            {[
              { icon: MapPin, label: "Lokalita", value: project.location },
              { icon: Ruler, label: "Plocha", value: project.area },
              { icon: Clock, label: "Doba realizace", value: project.duration },
              { icon: Banknote, label: "Cena", value: project.price },
              { icon: Calendar, label: "Termín", value: project.date },
            ].map((m) => (
              <div
                key={m.label}
                className="p-3 rounded-[16px]"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <m.icon
                    size={13}
                    className="text-[#2563eb]"
                    strokeWidth={1.5}
                  />
                  <span
                    className="font-sans"
                    style={{ fontSize: "11px", color: "#7b8794", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}
                  >
                    {m.label}
                  </span>
                </div>
                <span
                  className=""
                  style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p
            className="font-sans mb-8"
            style={{ fontSize: "15px", lineHeight: 1.78, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}
          >
            {project.longDesc}
          </p>

          {/* Tasks */}
          <div>
            <h3
              className="font-[family-name:var(--font-display)] text-foreground mb-4"
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Provedené práce
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.tasks.map((t) => (
                <div key={t} className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: "rgba(37,99,235,0.12)" }}>
                    <CheckCircle2
                      size={11}
                      className="text-[#2563eb]"
                      strokeWidth={2}
                    />
                  </div>
                  <span
                    className="font-sans"
                    style={{ fontSize: "13px", lineHeight: 1.56, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}
                  >
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 mt-8 overflow-x-auto pb-2">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                  i === currentImg
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function PortfolioPage() {
  const [filter, setFilter] = useState("Vše");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    filter === "Vše"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Lock body scroll when modal open
  if (typeof document !== "undefined") {
    document.body.style.overflow = selected ? "hidden" : "";
  }

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-32 pb-16 noise-overlay overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #ffffff 0%, #f4f8ff 48%, #ffffff 100%)",
        }}
      >
        <div
          className="absolute w-[600px] h-[600px] -top-[200px] right-0 rounded-full blur-[200px] pointer-events-none"
          style={{ background: "rgba(37,99,235,0.10)" }}
        />
        <div
          className="absolute w-[400px] h-[400px] bottom-0 -left-[100px] rounded-full blur-[150px] pointer-events-none"
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
              Portfolio
            </span>
            <h1
              className="font-[family-name:var(--font-display)] text-foreground mb-6"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 700,
                lineHeight: 1.0,
              }}
            >
              Dokončené
              <br />
              <span className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
                realizace
              </span>
            </h1>
            <p
              className="font-sans max-w-xl mb-12"
              style={{ fontSize: "17px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}
            >
              Každý projekt je pro nás unikátní. Podívejte se na naše nedávné
              realizace — od malých bytů po hotelové komplexy.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full transition-all duration-300 font-[family-name:var(--font-display)] ${
                  filter === f
                    ? "text-white shadow-lg shadow-accent/20"
                    : "text-[#5b6877] hover:text-[#0f172a]"
                }`}
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  ...(filter === f
                    ? {
                        background:
                          "linear-gradient(135deg, #2563eb, #4f46e5)",
                      }
                    : {}),
                }}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECT GRID ── */}
      <section
        className="relative py-16 noise-overlay"
        style={{
          background:
            "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelected(project)}
                >
                    <div className="relative overflow-hidden rounded-[28px] transition-all duration-500 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 18px 48px rgba(15,23,42,0.05)" }}>
                      {/* Cover */}
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <ImageWithFallback
                          src={project.cover}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        {/* Tag */}
                        <div className="absolute top-3 left-3">
                          <span
                            className="px-3 py-1 rounded-full backdrop-blur-sm border"
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              color: "rgba(255,255,255,0.92)",
                              background: "rgba(15,23,42,0.26)",
                              borderColor: "rgba(255,255,255,0.14)",
                              fontFamily: "'Manrope', var(--font-sans)",
                            }}
                          >
                            {project.tag}
                          </span>
                        </div>

                        {/* Hover icon */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                          <ArrowUpRight size={14} className="text-white" />
                        </div>

                        {/* Bottom info on image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <div>
                            <h3
                              className="text-white"
                              style={{
                                fontFamily: "'Sora', sans-serif",
                                fontSize: "20px",
                                fontWeight: 700,
                                letterSpacing: "-0.03em",
                                lineHeight: 1.2,
                              }}
                            >
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              <MapPin
                                size={11}
                                className="text-white/60"
                                strokeWidth={1.5}
                              />
                              <span
                                className="text-white/60 font-sans"
                                style={{ fontSize: "12px" }}
                              >
                                {project.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5">
                        <p
                          className="text-foreground/50 font-sans mb-4 line-clamp-2"
                          style={{ fontSize: "13px", lineHeight: 1.6 }}
                        >
                          {project.desc}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <div>
                              <span
                                className="text-foreground/30 block font-sans"
                                style={{ fontSize: "10px" }}
                              >
                                PLOCHA
                              </span>
                              <span
                                className="text-foreground font-[family-name:var(--font-display)]"
                                style={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                }}
                              >
                                {project.area}
                              </span>
                            </div>
                            <div>
                              <span
                                className="text-foreground/30 block font-sans"
                                style={{ fontSize: "10px" }}
                              >
                                DOBA
                              </span>
                              <span
                                className="text-foreground font-[family-name:var(--font-display)]"
                                style={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                }}
                              >
                                {project.duration}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className="text-foreground/30 block font-sans"
                              style={{ fontSize: "10px" }}
                            >
                              CENA
                            </span>
                            <span
                              className="text-accent font-[family-name:var(--font-display)]"
                              style={{ fontSize: "14px", fontWeight: 700 }}
                            >
                              {project.price}
                            </span>
                          </div>
                        </div>

                        {/* View detail hint */}
                        <div className="mt-4 pt-4 border-t border-foreground/5 flex items-center justify-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span
                            className="font-[family-name:var(--font-display)]"
                            style={{ fontSize: "12px", fontWeight: 600 }}
                          >
                            Zobrazit detail realizace
                          </span>
                          <ArrowUpRight size={13} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p
                className="text-foreground/30 font-sans"
                style={{ fontSize: "16px" }}
              >
                V této kategorii zatím nemáme realizace.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="relative py-16 noise-overlay"
        style={{
          background:
            "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "1 200+", label: "Dokončených projektů" },
                { value: "98 %", label: "Spokojených klientů" },
                { value: "15+", label: "Let zkušeností" },
                { value: "85 000+", label: "Natřených m²" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center p-6 rounded-[24px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 16px 42px rgba(15,23,42,0.05)" }}
                >
                  <span
                    className="block font-[family-name:var(--font-display)] text-accent mb-2"
                    style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700 }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-sans"
                    style={{ fontSize: "13px", color: "rgba(255,255,255,0.82)", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DETAIL MODAL ── */}
      <AnimatePresence>
        {selected && (
          <ProjectDetail
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
