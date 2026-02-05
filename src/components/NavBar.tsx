import Link from "next/link";
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="relative mystical-container flex flex-col items-center p-6 md:p-8 w-full overflow-hidden">
      {/* Ornate corner decorations */}
      <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-2 border-l-2 border-[#d4af37]/50 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 border-t-2 border-r-2 border-[#d4af37]/50 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 border-b-2 border-l-2 border-[#d4af37]/50 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-b-2 border-r-2 border-[#d4af37]/50 rounded-br-xl pointer-events-none" />

      {/* Corner stars */}
      <span className="absolute top-3 left-3 text-[#d4af37]/40 text-sm pointer-events-none">&#10022;</span>
      <span className="absolute top-3 right-3 text-[#d4af37]/40 text-sm pointer-events-none">&#10022;</span>
      <span className="absolute bottom-3 left-3 text-[#d4af37]/40 text-sm pointer-events-none">&#10022;</span>
      <span className="absolute bottom-3 right-3 text-[#d4af37]/40 text-sm pointer-events-none">&#10022;</span>

      {/* Mystical inner glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.15), transparent 60%)'
        }}
      />

      {/* Title */}
      <h1
        className="font-cinzel text-2xl md:text-3xl font-bold text-center mb-4 w-full text-[#d4af37] mystical-text-glow"
        style={{ letterSpacing: '0.15em' }}
      >
        Gnosis Esoterica
      </h1>

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
        <span className="text-[#d4af37] text-sm">&#10022;</span>
        <div className="w-8 md:w-12 h-0.5 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 w-full">
        {/* Eclipse logo with golden glow */}
        <div
          className="relative flex items-center justify-center rounded-full mx-auto"
          style={{
            width: 100,
            height: 100,
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)'
          }}
        >
          {/* Gradient background circle with gold/purple gradient */}
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="mysticalGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#e6d5b8"/>
                <stop offset="40%" stopColor="#d4af37"/>
                <stop offset="70%" stopColor="#2d1b4e"/>
                <stop offset="100%" stopColor="#1a0033"/>
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#mysticalGrad)" stroke="#d4af37" strokeWidth="2" strokeOpacity="0.6" />
          </svg>
          {/* Solar eclipse SVG centered on top */}
          <Image
            src="/planets/solar_eclipse.svg"
            alt="Solar Eclipse"
            width={96}
            height={96}
            className="absolute w-24 h-24"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))'
            }}
            priority={false}
          />
        </div>

        {/* Navigation links */}
        <Link
          href="/"
          className="font-cinzel text-[#e6d5b8] hover:text-[#d4af37] text-lg md:text-xl mt-4 transition-colors duration-300"
          style={{ letterSpacing: '0.1em' }}
        >
          TimeGnosis
        </Link>
        <a
          href="https://tarotdivinations.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-cinzel text-[#e6d5b8] hover:text-[#d4af37] text-lg md:text-xl transition-colors duration-300"
          style={{ letterSpacing: '0.1em' }}
        >
          Tarot
        </a>
      </div>
    </nav>
  );
}
