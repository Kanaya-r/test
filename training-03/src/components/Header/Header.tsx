"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { NAV_ITEMS } from '@/lib/nav'

import type { IsActive } from '@/types/nav'

import styles from './Header.module.scss'

function isActive({ pathname, href, exact }: IsActive) {
  if (exact) return pathname === href;
  const norm = (s: string) => s.replace(/\/+$/, "") || "/";
  return norm(pathname).startsWith(norm(href));
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={ styles.header }>
      <h1>
        <Link href="/">Next.js Training</Link>
      </h1>
      <nav>
        <ul>
          { NAV_ITEMS.map(item => {
            const active = isActive({ pathname, href: item.href, exact: item.exact });
            return (
              <li
                key={ item.label }
                className={ active ? styles.active : undefined }
                aria-current={ active ? "page" : undefined }
              >
                <Link href={ item.href }>{ item.label }</Link>
              </li>
            )
          }) }
        </ul>
      </nav>
    </header>
  )
}