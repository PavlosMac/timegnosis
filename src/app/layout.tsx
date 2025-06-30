import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from 'next/image';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen w-full overflow-x-hidden">
          {/* Subtle astrology wheel background */}
          <Image
            src="/planets/astro_wheel.svg"
            alt="Astro Wheel Background"
            fill
            className="hidden lg:block pointer-events-none select-none fixed top-0 left-0 z-0 opacity-70 w-[70vw] h-auto max-w-none"
            aria-hidden="true"
            priority={false}
            style={{ objectFit: 'contain' }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
