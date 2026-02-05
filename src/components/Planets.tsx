'use client';

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Planet = {
  name: string;
  color: keyof typeof tailwindColors;
  energy: number;
  file: string;
};

const tailwindColors = {
  "green-500": "#22c55e",
  "orange-600": "#ea580c",
  "red-600": "#dc2626",
  "yellow-500": "#eab308",
  "gray-800": "#1f2937",
  "blue-300": "#60a5fa",
  "blue-700": "#1d4ed8",
  "purple-800": "#5b21b6",
  "blue-gray-200":"#f4f4f5",
  "pink-400": "#f472b6",
  "orange-800": "#9a3412"
} as const;

const planets: Planet[] = [
  { name: "Mercury", color: "green-500", energy: 8, file: "/planets/Mercury.svg" },
  { name: "Venus", color: "pink-400", energy: 3, file: "/planets/Venus.svg" },
  { name: "Sun", color: "yellow-500", energy: 1, file: "/planets/Sun.svg" },
  { name: "Saturn", color: "gray-800", energy: 5, file: "/planets/Saturn.svg" },
  { name: "Uranus", color: "blue-300", energy: 22, file: "/planets/Uranus.svg" },
  { name: "Neptune", color: "blue-700", energy: 9, file: "/planets/Neptune.svg" },
  { name: "Mars", color: "red-600", energy: 4, file: "/planets/Annoy.svg" },
  { name: "Pluto", color: "purple-800", energy: 2, file: "/planets/Pluto.svg" },
  { name: "Moon", color: "blue-gray-200", energy: 7, file: "/planets/moon.svg" },
  { name: "Jupiter", color: "orange-800", energy: 6, file: "/planets/Jupiter.svg" }
];


function sumDigits(num: number): number {
  return num
    .toString()
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit), 0);
}

function reduceToSingleDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22) {
    num = sumDigits(num);
  }
  return num;
}

export default function Planets() {
  const searchParams = useSearchParams();
  const day = Number(searchParams.get('day'));
  const month = Number(searchParams.get('month'));
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const router = useRouter();
  const [loadingPlanet, setLoadingPlanet] = useState<string | null>(null);


  if (!today) return null;

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  function getPersonalMonth(personalYear: number, todayMonth: number, todayDay: number): number {
    let month = todayMonth;
    if (todayDay >= 21) {
      month = todayMonth === 12 ? 1 : todayMonth + 1;
    }
    return reduceToSingleDigit(personalYear + month);
  }

  function getPersonalDay(personalMonth: number, todayDay: number): number {
    return reduceToSingleDigit(todayDay + personalMonth);
  }

  function getPersonalYear(birthDay: number, birthMonth: number, todayYear: number): number {
    const rawYear = sumDigits(birthDay) + sumDigits(birthMonth) + sumDigits(todayYear);
    return reduceToSingleDigit(rawYear);
  }

  const personalYear = (day && month) ? getPersonalYear(day, month, todayYear) : undefined;
  const personalMonth = (personalYear !== undefined) ? getPersonalMonth(personalYear, todayMonth, todayDay) : undefined;
  const personalDay = (personalMonth !== undefined) ? getPersonalDay(personalMonth, todayDay) : undefined;


  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center">
      {/* Main container with mystical styling */}
      <div className="relative mystical-container p-6 sm:p-8 md:p-10 w-full">
        {/* Ornate corner decorations */}
        <div className="absolute top-0 left-0 w-12 h-12 md:w-24 md:h-24 border-t-2 border-l-2 border-[#d4af37]/50 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 h-12 md:w-24 md:h-24 border-t-2 border-r-2 border-[#d4af37]/50 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-12 h-12 md:w-24 md:h-24 border-b-2 border-l-2 border-[#d4af37]/50 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-12 md:w-24 md:h-24 border-b-2 border-r-2 border-[#d4af37]/50 rounded-br-xl pointer-events-none" />

        {/* Mystical glow overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none rounded-xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15), transparent 70%)'
          }}
        />

        {/* Header section */}
        <div className="relative z-10">
          <h2 className="mystical-heading text-xl sm:text-2xl md:text-3xl text-center mb-2">
            Planetary Assignment
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
            <span className="text-[#d4af37] text-lg">&#10022;</span>
            <div className="w-8 md:w-12 h-0.5 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
          </div>

          <p className="mystical-flavor text-base md:text-lg mb-8 max-w-2xl mx-auto text-center">
            The Astrological Planets help us define and characterise those archetypal forces represented by the personal number.
          </p>
        </div>

        {/* Planetary grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {planets.map((planet, index) => {
            let isActive = false;

            if (planet.name === "Moon") {
              isActive = (personalDay === 7 || personalDay === 11 || personalMonth === 7 || personalMonth === 11 || personalYear === 7 || personalYear === 11);
            } else {
              const directMatch = (planet.energy === personalDay || planet.energy === personalMonth || planet.energy === personalYear);

              const masterReductionMatch = (
                (personalDay === 22 && planet.energy === 4) ||
                (personalMonth === 22 && planet.energy === 4) ||
                (personalYear === 22 && planet.energy === 4) ||
                (personalDay === 11 && planet.energy === 2) ||
                (personalMonth === 11 && planet.energy === 2) ||
                (personalYear === 11 && planet.energy === 2)
              );

              isActive = directMatch || masterReductionMatch;
            }

            const isLoading = loadingPlanet === planet.name;

            return (
              <button
                key={index}
                onClick={() => {
                  setLoadingPlanet(planet.name);
                  router.push(`/planet/${planet.name.toLowerCase()}`);
                }}
                className={`
                  relative group flex flex-col items-center p-4 md:p-5 rounded-lg
                  transition-all duration-300 w-full
                  focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50
                  ${isActive
                    ? 'mystical-border-glow animate-float bg-gradient-to-br from-[#1a0033]/80 to-[#2d1b4e]/80'
                    : 'mystical-border bg-gradient-to-br from-[#1a0033]/40 to-[#2d1b4e]/40 hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  }
                  ${isLoading ? 'opacity-60 cursor-wait' : 'cursor-pointer'}
                `}
                disabled={isLoading}
                aria-busy={isLoading}
                type="button"
                style={{
                  animationDelay: isActive ? `${index * 0.1}s` : undefined
                }}
              >
                {/* Inner border for ornate feel */}
                <div className="absolute inset-2 border border-[#d4af37]/20 rounded-md pointer-events-none" />

                {/* Corner stars */}
                <span className="absolute top-2 left-2 text-[#d4af37]/40 text-xs">&#10022;</span>
                <span className="absolute top-2 right-2 text-[#d4af37]/40 text-xs">&#10022;</span>
                <span className="absolute bottom-2 left-2 text-[#d4af37]/40 text-xs">&#10022;</span>
                <span className="absolute bottom-2 right-2 text-[#d4af37]/40 text-xs">&#10022;</span>

                {/* Hover glow effect */}
                <div className={`
                  absolute -inset-0.5 rounded-lg opacity-0 blur transition-opacity duration-500 pointer-events-none
                  ${isActive
                    ? 'opacity-40 bg-gradient-to-r from-[#d4af37] to-[#8a2be2]'
                    : 'group-hover:opacity-30 bg-gradient-to-r from-[#d4af37] to-[#8a2be2]'
                  }
                `} />

                {/* Planet orb */}
                <motion.div
                  className="relative flex items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 mb-3 border-2 border-[#d4af37]/40"
                  style={{ backgroundColor: tailwindColors[planet.color as keyof typeof tailwindColors] }}
                  animate={isActive ? { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] } : {}}
                  transition={isActive ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src={planet.file}
                      alt={planet.name}
                      width={40}
                      height={40}
                      className="w-8 h-8 md:w-10 md:h-10 filter brightness-200 contrast-200 drop-shadow-lg"
                      onError={() => console.error(`Failed to load ${planet.file}`)}
                      priority={false}
                    />
                  </div>
                </motion.div>

                {/* Planet name with mystical subheading style */}
                <span className={`
                  mystical-subheading text-sm md:text-base mb-1 relative z-10
                  ${isActive ? 'mystical-text-glow text-[#d4af37]' : 'text-[#e6d5b8]'}
                `}>
                  {planet.name}
                </span>

                {/* Energy number */}
                <span className={`
                  text-xs md:text-sm relative z-10
                  ${isActive ? 'text-[#d4af37]/80' : 'text-[#e6d5b8]/60'}
                `}>
                  {planet.name === "Moon" ? "7/11" : planet.energy}
                </span>

                {/* Loading overlay with mystical spinner */}
                {isLoading && (
                  <div className="absolute inset-0 bg-[#1a0033]/80 flex items-center justify-center z-20 rounded-lg backdrop-blur-sm">
                    <svg
                      className="w-8 h-8 text-[#d4af37]"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ animation: 'mysticalRotate 1.5s linear infinite' }}
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        className="opacity-90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M12 2a10 10 0 0 1 10 10"
                      />
                      {/* Mystical star accent */}
                      <text
                        x="12"
                        y="13"
                        textAnchor="middle"
                        fontSize="6"
                        fill="currentColor"
                        className="opacity-60"
                      >
                        &#10022;
                      </text>
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
