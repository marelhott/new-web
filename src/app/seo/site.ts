export const SITE = {
  name: "Malíři v černém",
  baseUrl: "https://www.malirivcernem.cz",
  email: "info@malirivcernem.cz",
  phoneE164: "+420732333550",
  phoneDisplay: "+420 732 333 550",
  city: "Praha",
  country: "CZ",
  serviceAreas: ["Praha 1–10", "Praha-západ", "Praha-východ"],
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "18:00",
  },
  defaultOgImage:
    "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fde4c3a59dfe7452abff728cfc029c559?format=webp&width=2400&height=1260",
} as const;

export type SeoPayload = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Array<Record<string, unknown>>;
};

type ServiceSeo = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

const serviceSeoMap: Record<string, ServiceSeo> = {
  "malovani-bytu": {
    slug: "malovani-bytu",
    title: "Malování bytů v Praze",
    description:
      "Profesionální malování bytů a rodinných domů v Praze. Zakrytí, příprava povrchů, precizní výmalba a úklid v ceně.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fccb0003eea4f4419ae5d6485d2222ae5",
  },
  "malovani-pred-prodejem": {
    slug: "malovani-pred-prodejem",
    title: "Malování před prodejem nebo pronájmem",
    description:
      "Rychlé a efektivní malování bytu či domu před prodejem nebo pronájmem. Neutrální atmosféra a zvýšená atraktivita nemovitosti.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F6f785ac818cd4504aa3ddbdcc553358c",
  },
  "malovani-kancelari": {
    slug: "malovani-kancelari",
    title: "Malování kanceláří v Praze",
    description:
      "Malování kanceláří a komerčních prostor v Praze s minimálním omezením provozu. Flexibilní termíny, rychlá realizace a čistá práce.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F3026d95741854f52aaaf83680e170c34",
  },
  "komercni-objekty": {
    slug: "komercni-objekty",
    title: "Malování restaurací, penzionů a hotelů",
    description:
      "Malování pokojů a společných prostor restaurací, penzionů a menších hotelů s minimálním omezením provozu.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F813e356566e0424cbba8f945a4b5a0bc",
  },
  "malovani-svj": {
    slug: "malovani-svj",
    title: "Malování společných prostor domu (SVJ)",
    description:
      "Malování chodeb, schodišť a dalších prostor bytových domů spravovaných SVJ a bytovými družstvy. Etapová realizace bez obtíží.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2Ffe0d5ae8e8b3454e951a42634b8be26d",
  },
  "dekorativni-sterky": {
    slug: "dekorativni-sterky",
    title: "Dekorativní stěrky a microcement",
    description:
      "Dekorativní stěrky, microcement a designové povrchy pro moderní interiéry. Vzorkování, návrh i profesionální aplikace.",
    image:
      "https://images.unsplash.com/photo-1719194981461-fa0ec450999e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
};

export const SERVICE_SLUGS = Object.keys(serviceSeoMap);

function absoluteUrl(path: string) {
  return `${SITE.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE.baseUrl}/#business`,
    name: SITE.name,
    url: SITE.baseUrl,
    image: SITE.defaultOgImage,
    telephone: SITE.phoneE164,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    areaServed: SITE.serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE.openingHours.days,
      opens: SITE.openingHours.opens,
      closes: SITE.openingHours.closes,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE.phoneE164,
        email: SITE.email,
        availableLanguage: ["cs", "en"],
        areaServed: "CZ",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Malířské služby",
      itemListElement: Object.values(serviceSeoMap).map((service) => ({
        "@type": "OfferCatalog",
        name: service.title,
        url: absoluteUrl(`/sluzby/${service.slug}`),
      })),
    },
    priceRange: "$$",
  };
}

function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.baseUrl}/#website`,
    url: SITE.baseUrl,
    name: SITE.name,
    inLanguage: "cs-CZ",
  };
}

function webPageSchema(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "cs-CZ",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.baseUrl}/#website`,
    },
  };
}

function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function serviceSchema(service: ServiceSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    image: service.image,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE.baseUrl}/#business`,
      name: SITE.name,
      telephone: SITE.phoneE164,
      email: SITE.email,
    },
    serviceType: service.title,
    areaServed: SITE.serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
    url: absoluteUrl(`/sluzby/${service.slug}`),
  };
}

function homeSeo(): SeoPayload {
  return {
    title: "Malíři v černém | Malování bytů, kanceláří a dekorativní stěrky Praha",
    description:
      "Profesionální malířské práce v Praze a okolí. Malování bytů, kanceláří, opravy zdí, dekorativní stěrky a online kalkulačka ceny.",
    path: "/",
    image: SITE.defaultOgImage,
    jsonLd: [
      businessSchema(),
      webSiteSchema(),
      webPageSchema("Domů", "/", "Úvodní stránka firmy Malíři v černém"),
    ],
  };
}

function staticPageSeo(pathname: string): SeoPayload | null {
  const servicesFaq = [
    {
      question: "Jak vybrat správnou službu, když si nejsem jistý?",
      answer:
        "Pokud si nejste jistí typem služby, doporučujeme využít online kalkulačku nebo nás kontaktovat. Na základě fotek či krátkého popisu doporučíme vhodný postup a připravíme orientační nacenění.",
    },
    {
      question: "Jsou v ceně malování zahrnuté přípravné práce a úklid?",
      answer:
        "Rozsah přípravných prací a úklidu záleží na konkrétní zakázce a stavu prostoru. Ve finální nabídce vždy jasně uvádíme, co je součástí ceny, aby nevznikly nejasnosti.",
    },
    {
      question: "Realizujete zakázky i pro firmy a SVJ?",
      answer:
        "Ano, realizujeme i komerční zakázky, kanceláře, společné prostory domů a projekty pro SVJ či developery včetně etapového postupu a koordinace.",
    },
  ] as const;

  const calculatorFaq = [
    {
      question: "Je cena z kalkulačky finální?",
      answer:
        "Cena z kalkulačky je orientační. Přesnou cenu potvrzujeme po upřesnění detailů a případné osobní prohlídce prostoru.",
    },
    {
      question: "Za jak dlouho se po odeslání poptávky ozvete?",
      answer:
        "Na poptávky reagujeme co nejdříve, obvykle telefonicky nebo emailem. Ve většině případů nejpozději do 24 hodin.",
    },
    {
      question: "Co když se poptávka přes formulář neodešle?",
      answer:
        "Na stránce je k dispozici záložní kontakt. Můžete rovnou zavolat nebo odeslat email s předvyplněnou poptávkou.",
    },
  ] as const;

  const descriptions = {
    sluzby:
      "Kompletní přehled malířských služeb: malování bytů a kanceláří, dekorativní stěrky, opravy povrchů a komerční objekty v Praze.",
    realizace:
      "Reference a ukázky realizací malířských prací v Praze. Prohlédněte si dokončené projekty v bytech, kancelářích a komerčních objektech.",
    kalkulacka:
      "Spočítejte si orientační cenu malování online a odešlete poptávku během pár minut. Rychlé nacenění malířských prací v Praze.",
    oNas:
      "Poznejte tým Malíři v černém. Rodinná firma z Prahy s důrazem na preciznost, čistotu práce a férovou komunikaci.",
    kontakt:
      "Kontaktujte Malíře v černém. Telefon, email a kontaktní formulář pro poptávku malířských prací v Praze a okolí.",
    ochranaOsobnichUdaju:
      "Informace o zpracování osobních údajů při poptávce malířských služeb a komunikaci se společností Malíři v černém.",
    obchodniPodminky:
      "Obchodní podmínky a základní pravidla spolupráce pro malířské práce poskytované společností Malíři v černém.",
  } as const;

  const pages: Record<string, SeoPayload> = {
    "/sluzby": {
      title: "Služby | Malíři v černém",
      description: descriptions.sluzby,
      path: "/sluzby",
      jsonLd: [
        businessSchema(),
        webPageSchema("Služby", "/sluzby", descriptions.sluzby),
        faqSchema([...servicesFaq]),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Služby", path: "/sluzby" },
        ]),
      ],
    },
    "/realizace": {
      title: "Realizace | Ukázky prací Malíři v černém",
      description: descriptions.realizace,
      path: "/realizace",
      jsonLd: [
        businessSchema(),
        webPageSchema("Realizace", "/realizace", descriptions.realizace),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Realizace", path: "/realizace" },
        ]),
      ],
    },
    "/kalkulacka": {
      title: "Kalkulačka malování a poptávka | Malíři v černém",
      description: descriptions.kalkulacka,
      path: "/kalkulacka",
      jsonLd: [
        businessSchema(),
        webPageSchema("Kalkulačka", "/kalkulacka", descriptions.kalkulacka),
        faqSchema([...calculatorFaq]),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Kalkulačka", path: "/kalkulacka" },
        ]),
      ],
    },
    "/o-nas": {
      title: "O nás | Malíři v černém",
      description: descriptions.oNas,
      path: "/o-nas",
      jsonLd: [
        businessSchema(),
        webPageSchema("O nás", "/o-nas", descriptions.oNas),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "O nás", path: "/o-nas" },
        ]),
      ],
    },
    "/kontakt": {
      title: "Kontakt | Malíři v černém Praha",
      description: descriptions.kontakt,
      path: "/kontakt",
      jsonLd: [
        businessSchema(),
        webPageSchema("Kontakt", "/kontakt", descriptions.kontakt),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ]),
      ],
    },
    "/ochrana-osobnich-udaju": {
      title: "Ochrana osobních údajů | Malíři v černém",
      description: descriptions.ochranaOsobnichUdaju,
      path: "/ochrana-osobnich-udaju",
      jsonLd: [
        businessSchema(),
        webPageSchema(
          "Ochrana osobních údajů",
          "/ochrana-osobnich-udaju",
          descriptions.ochranaOsobnichUdaju,
        ),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Ochrana osobních údajů", path: "/ochrana-osobnich-udaju" },
        ]),
      ],
    },
    "/obchodni-podminky": {
      title: "Obchodní podmínky | Malíři v černém",
      description: descriptions.obchodniPodminky,
      path: "/obchodni-podminky",
      jsonLd: [
        businessSchema(),
        webPageSchema(
          "Obchodní podmínky",
          "/obchodni-podminky",
          descriptions.obchodniPodminky,
        ),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Obchodní podmínky", path: "/obchodni-podminky" },
        ]),
      ],
    },
  };
  return pages[pathname] ?? null;
}

function servicePageSeo(pathname: string): SeoPayload | null {
  const match = pathname.match(/^\/sluzby\/([^/]+)$/);
  if (!match) return null;
  const service = serviceSeoMap[match[1]];
  if (!service) return null;
  return {
    title: `${service.title} | Malíři v černém`,
    description: service.description,
    path: `/sluzby/${service.slug}`,
    image: service.image,
    jsonLd: [
      businessSchema(),
      webPageSchema(service.title, `/sluzby/${service.slug}`, service.description),
      breadcrumbSchema([
        { name: "Domů", path: "/" },
        { name: "Služby", path: "/sluzby" },
        { name: service.title, path: `/sluzby/${service.slug}` },
      ]),
      serviceSchema(service),
    ],
  };
}

export function resolveSeo(pathname: string): SeoPayload {
  if (pathname === "/") return homeSeo();
  const servicePage = servicePageSeo(pathname);
  if (servicePage) return servicePage;
  const staticPage = staticPageSeo(pathname);
  if (staticPage) return staticPage;

  return {
    title: "404 | Stránka nebyla nalezena | Malíři v černém",
    description:
      "Požadovaná stránka nebyla nalezena. Pokračujte na hlavní stránku Malíři v černém nebo nás kontaktujte.",
    path: pathname || "/",
    noindex: true,
    jsonLd: [businessSchema()],
  };
}
