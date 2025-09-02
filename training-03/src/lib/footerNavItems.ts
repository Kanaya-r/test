import type { footerNavItem } from "../types/footerNav"

export const NAV_ITEMS: footerNavItem[] = [
  { label: 'TOP', href: '/' },
  { label: 'BLOG', href: '/blog/' },
  { label: 'CONTACT', href: '/contact/' }
] as const