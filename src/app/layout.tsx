import type { Metadata } from "next";
import { Cinzel, Crimson_Pro } from "next/font/google";
import Image from 'next/image';
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gnosis Esoterica",
  description: "divination and mysticism for the modern age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${crimsonPro.variable} antialiased`}
      >
        {/* Mystical starfield background - single GPU-accelerated layer */}
        <div
          className="fixed inset-0"
          style={{
            background: 'linear-gradient(to bottom, #0a0015, #1a0033, #2d1b4e)',
            transform: 'translateZ(0)'
          }}
        >
          {/* Combined overlays as single pseudo-layer for performance */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.12), transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(138, 43, 226, 0.12), transparent 50%),
                radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)
              `,
              transform: 'translateZ(0)',
              pointerEvents: 'none'
            }}
          />
        </div>

        <div className="relative min-h-screen w-full overflow-x-hidden">
          {/* Subtle astrology wheel background - static for performance */}
          <Image
            src="/planets/astro_wheel.svg"
            alt="Astro Wheel Background"
            fill
            className="hidden lg:block pointer-events-none select-none fixed top-0 left-0 z-0 opacity-40 w-[70vw] h-auto max-w-none"
            aria-hidden="true"
            priority={false}
            style={{ objectFit: 'contain', transform: 'translateZ(0)' }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
