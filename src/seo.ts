// SEO meta pro jednotlivé stránky – sdílí je prerender (scripts/prerender.mjs)
// i klientská navigace (komponenta RouteMeta v App.tsx).

export const SITE_URL = 'https://zvuknabaterky.cz';

export type RouteMeta = {
  title: string;
  description: string;
  ogTitle?: string;
};

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Zvuk na baterky – Pronájem výkonných reproduktorů | Praha a stř. Čechy',
    description:
      'Půjčujeme špičkové bateriové reproduktory JBL a Lamax pro párty, oslavy a akce. Bezdrátové mikrofony v ceně, doprava po Praze. Rezervujte od 700 Kč.',
    ogTitle: 'Zvuk na baterky – Pronájem reproduktorů JBL',
  },
  '/kontakt': {
    title: 'Kontakt a rezervace | Zvuk na baterky – pronájem reproduktorů',
    description:
      'Rezervujte si bateriový reproduktor JBL nebo Lamax na párty či akci. Zavolejte, napište e-mail nebo vyplňte poptávkový formulář. Praha a střední Čechy.',
  },
  '/obchodni-podminky': {
    title: 'Obchodní podmínky pronájmu | Zvuk na baterky',
    description:
      'Obchodní podmínky půjčovny bateriových reproduktorů Zvuk na baterky – rezervace, převzetí a vrácení techniky, platba a odpovědnost za zapůjčené vybavení.',
  },
  '/ochrana-osobnich-udaju': {
    title: 'Ochrana osobních údajů | Zvuk na baterky',
    description:
      'Jak Zvuk na baterky zpracovává osobní údaje z poptávkového formuláře, jak dlouho je uchovává a jaká máte práva podle GDPR. Kontakt na správce údajů.',
  },
};

/** Kanonická URL bez koncového lomítka (kromě úvodní stránky). */
export function canonicalUrl(route: string): string {
  const clean = route === '/' ? '/' : route.replace(/\/+$/, '');
  return SITE_URL + clean;
}

export function getRouteMeta(route: string): RouteMeta {
  const clean = route === '/' ? '/' : route.replace(/\/+$/, '');
  return ROUTE_META[clean] ?? ROUTE_META['/'];
}
