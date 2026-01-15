// import TarotGame from "@/app/tarot/components/TarotGame";

// export default function TarotPage() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gradient-to-br from-yellow-100 to-indigo-100">
//       <TarotGame />
//     </main>
//   );
// }

"use client";
import TarotGame from "@/app/tarot/components/TarotGame";
import TarotLanding from "@/app/tarot/components/TarotLanding";
import TarotChart from "@/app/tarot/components/TarotChart";
import { Cinzel, Crimson_Pro } from 'next/font/google';
import { useMemo, useState } from 'react';
import './tarot.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel'
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-crimson-pro'
});

type TarotSection = 'landing' | 'reading' | 'significators' | 'chart' | 'guide';

export default function TarotPage() {
  const [currentSection, setCurrentSection] = useState<TarotSection>('landing');

  // Generate star positions once to avoid hydration mismatch
  const stars = useMemo(() =>
    [...Array(100)].map((_, i) => ({
      left: `${(i * 7.3 + 13) % 100}%`,
      top: `${(i * 11.7 + 23) % 100}%`,
      animationDelay: `${(i * 0.37) % 3}s`,
      animationDuration: `${2 + (i * 0.29) % 2}s`,
    })), []
  );

  const handleNavigate = (section: string) => {
    setCurrentSection(section as TarotSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'reading':
        return <TarotGame />;
      case 'significators':
        // Placeholder for Significators page
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl text-[#d4af37] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              Significators
            </h2>
            <p className="text-[#e6d5b8]/70" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Coming soon...
            </p>
            <button
              onClick={() => handleNavigate('landing')}
              className="mt-8 px-6 py-3 border border-[#d4af37]/50 rounded-lg text-[#d4af37]
                         hover:bg-[#d4af37]/10 transition-colors"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ← Back to Portal
            </button>
          </div>
        );
      case 'chart':
        return <TarotChart />;
      case 'guide':
        // Placeholder for How to use the Oracle article
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl text-[#d4af37] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              How to use the Oracle
            </h2>
            <p className="text-[#e6d5b8]/70" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Coming soon...
            </p>
            <button
              onClick={() => handleNavigate('landing')}
              className="mt-8 px-6 py-3 border border-[#d4af37]/50 rounded-lg text-[#d4af37]
                         hover:bg-[#d4af37]/10 transition-colors"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ← Back to Portal
            </button>
          </div>
        );
      default:
        return <TarotLanding onNavigate={handleNavigate} />;
    }
  };

  return (
    <main className={`min-h-screen relative overflow-hidden ${cinzel.variable} ${crimsonPro.variable}`}>
      {/* Mystical starfield background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0015] via-[#1a0033] to-[#2d1b4e]">
        {/* Animated stars */}
        <div className="absolute inset-0 opacity-60">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={star}
            />
          ))}
        </div>

        {/* Constellation overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.15),transparent_50%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_60%,rgba(138,43,226,0.15),transparent_50%)]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-10 px-4 pb-10">
        {/* Back button when not on landing */}
        {currentSection !== 'landing' && (
          <button
            onClick={() => handleNavigate('landing')}
            className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2
                       text-[#d4af37]/70 hover:text-[#d4af37] transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span>←</span>
            <span className="text-sm tracking-wider">Portal</span>
          </button>
        )}

        {renderContent()}
      </div>
    </main>
  );
}
