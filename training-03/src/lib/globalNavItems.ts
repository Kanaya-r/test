import type { GlobalNavItem } from "../types/globalNav"

export const NAV_ITEMS: GlobalNavItem[] = [
  { label: 'BLOG', href: '/blog/' },
  { label: 'CONTACT', href: '/contact/' }
] as const