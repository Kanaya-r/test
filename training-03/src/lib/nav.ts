import type { NavItem } from "../types/nav"

export const NAV_ITEMS: NavItem[] = [
  { label: 'BLOG', href: '/blog/' },
  { label: 'CONTACT', href: '/contact/' }
] as const