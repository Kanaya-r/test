import type { globalNavItem } from "../types/globalNav"

export const NAV_ITEMS: globalNavItem[] = [
  { label: 'BLOG', href: '/blog/' },
  { label: 'CONTACT', href: '/contact/' }
] as const