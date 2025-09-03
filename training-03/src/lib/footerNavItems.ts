import type { FooterNavItem } from "../types/footerNav"

export const NAV_ITEMS: FooterNavItem[] = [
  { label: 'TOP', href: '/' },
  { label: 'BLOG', href: '/blog/' },
  { label: 'CONTACT', href: '/contact/' }
] as const