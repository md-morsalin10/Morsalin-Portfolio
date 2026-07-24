import { Syne } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScrollProvider from '@/provider/SmoothScrolling';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import MeshBackground from '../components/MeshBackground';



/* ── Fonts ─────────────────────────────────────────────────
   next/font handles preload automatically — no manual
   <link rel="preload"> needed (that caused your warnings).
─────────────────────────────────────────────────────────── */
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',   // ✅ prevents FOUT
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

/* ── Metadata ───────────────────────────────────────────── */
export const metadata = {
  title: 'Md. Morsalin — MERN Stack Developer',
  description: 'Portfolio of Md. Morsalin, a Full-Stack MERN Developer specializing in Next.js, React, Node.js, and MongoDB.',
  keywords: ['MERN Stack', 'Next.js', 'React', 'Portfolio', 'Bangladesh'],
  authors: [{ name: 'Md. Morsalin' }],
  openGraph: {
    title: 'Md. Morsalin — MERN Stack Developer',
    description: 'Building scalable, performant web applications.',
    type: 'website',
  },
};

/* ── Layout ─────────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${mono.variable}`}
      /* ✅ suppressHydrationWarning prevents mismatch from
         browser extensions modifying the DOM */
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#060412] text-white overflow-x-hidden antialiased">
        <div className="relative isolate min-h-screen bg-[#060412]">
          <div className="fixed inset-0 pointer-events-none z-0">
            <MeshBackground />
          </div>
          <div className="relative z-10">
            <Preloader />
            <CustomCursor />
            {/*
              ✅ SmoothScrollProvider is 'use client' — safe to wrap here.
              Navbar and Footer are inside so Lenis covers the full page.
            */}
            <SmoothScrollProvider>
              <Navbar />
              <main>
                {children}
              </main>
              <Footer />
            </SmoothScrollProvider>
          </div>
        </div>
      </body>
    </html>
  );
}