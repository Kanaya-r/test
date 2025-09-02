import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import "../styles/globals.scss"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Training",
  description: "Next.js を触ってみるためのプロジェクト",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
