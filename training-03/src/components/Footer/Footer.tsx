'use client'

import Link from "next/link"

import { NAV_ITEMS } from '@/lib/footerNavItems'

import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={ styles.footer }>
      <div className={ styles.footer_inr }>
        <nav>
          <ul>
            { NAV_ITEMS.map(item => (
              <li key={item.label}>
                <Link href={item.href}>
                  {item.label}
                </Link>
              </li>
            )) }
          </ul>
        </nav>
      </div>
    </footer>
  )
}