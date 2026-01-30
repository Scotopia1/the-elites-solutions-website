import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      fr: '/a-propos',
      ar: '/نبذة-عنا',
    },
    '/services': {
      en: '/services',
      fr: '/services',
      ar: '/خدمات',
    },
    '/services/[slug]': {
      en: '/services/[slug]',
      fr: '/services/[slug]',
      ar: '/خدمات/[slug]',
    },
    '/work': {
      en: '/work',
      fr: '/portfolio',
      ar: '/معرض-الأعمال',
    },
    '/work/[slug]': {
      en: '/work/[slug]',
      fr: '/portfolio/[slug]',
      ar: '/معرض-الأعمال/[slug]',
    },
    '/portfolio': {
      en: '/portfolio',
      fr: '/portfolio',
      ar: '/معرض-الأعمال',
    },
    '/contact': {
      en: '/contact',
      fr: '/contact',
      ar: '/اتصل-بنا',
    },
    '/blog': {
      en: '/blog',
      fr: '/blog',
      ar: '/مدونة',
    },
    '/blog/[slug]': {
      en: '/blog/[slug]',
      fr: '/blog/[slug]',
      ar: '/مدونة/[slug]',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
