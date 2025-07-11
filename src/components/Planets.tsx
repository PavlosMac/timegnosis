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


  if (!today) return null; // Or a spinner/loading indicator

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  // Corrected: Personal Month = reduce(personalYear + currentMonth)
  function getPersonalMonth(personalYear: number, todayMonth: number, todayDay: number): number {
    // If today is before the 21st, use current month. If on/after 21st, use next month (wrap to 1 if December)
    let month = todayMonth;
    if (todayDay >= 21) {
      month = todayMonth === 12 ? 1 : todayMonth + 1;
    }
    return reduceToSingleDigit(personalYear + month);
  }
  // Personal Day = reduce(today.getDate() + personalMonth)
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
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#4B2067]">
          Planetary Assignment
        </h2>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto text-center">
          The Astrological Planets help us define and characterise those archetypal forces represented by the personal number.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-4">
          {planets.map((planet, index) => {
            const isActive = planet.name === "Moon"
              ? (personalDay === 7 || personalDay === 11 || personalMonth === 7 || personalMonth === 11 || personalYear === 7 || personalYear === 11)
              : (planet.energy === personalDay || planet.energy === personalMonth || planet.energy === personalYear);
            const isLoading = loadingPlanet === planet.name;
            return (
              <button
                key={index}
                onClick={() => {
                  setLoadingPlanet(planet.name);
                  router.push(`/planet/${planet.name.toLowerCase()}`);
                }}
                className={`relative flex flex-col items-center p-4 rounded-lg transition-all duration-300 w-full h-full focus:outline-none ${isActive ? 'bg-gray-800/50 scale-105' : ''} ${isLoading ? 'opacity-60 cursor-wait' : 'cursor-pointer hover:border-blue-400 border border-gray-700'}`}
                disabled={isLoading}
                aria-busy={isLoading}
                type="button"
              >
                <motion.div
                  className="flex items-center justify-center rounded-full w-16 h-16 mb-3"
                  style={{ backgroundColor: tailwindColors[planet.color as keyof typeof tailwindColors] }}
                  animate={isActive ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
                  transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src={planet.file}
                      alt={planet.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 filter brightness-200 contrast-200 drop-shadow-lg"
                      onError={() => console.error(`Failed to load ${planet.file}`)}
                      priority={false}
                    />
                  </div>
                </motion.div>
                <span className="text-base font-medium text-white mb-1">{planet.name}</span>
                <span className="text-sm text-gray-400">
                  {planet.name === "Moon" ? "7/11" : planet.energy}
                </span>
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 rounded-lg">
                    <svg className="w-8 h-8 animate-spin text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
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
