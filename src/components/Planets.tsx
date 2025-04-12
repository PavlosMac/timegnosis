'use client';

import { motion } from "framer-motion";

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
  { name: "Mars", color: "red-600", energy: 4, file: "/planets/Mars.svg" },
  { name: "Sun", color: "yellow-500", energy: 1, file: "/planets/Sun.svg" },
  { name: "Saturn", color: "gray-800", energy: 5, file: "/planets/Saturn.svg" },
  { name: "Uranus", color: "blue-300", energy: 22, file: "/planets/Uranus.svg" },
  { name: "Neptune", color: "blue-700", energy: 9, file: "/planets/Neptune.svg" },
  { name: "Pluto", color: "purple-800", energy: 2, file: "/planets/Pluto.svg" },
  { name: "Moon", color: "blue-gray-200", energy: 7, file: "/planets/moon.svg" },
  { name: "Jupiter", color: "orange-800", energy: 6, file: "/planets/Jupiter.svg" }
];

export default function Planets({ day, month, year }: { day: number; month: number; year: number }) {
  const hasValidInput = day > 0 || month > 0 || year > 0;

  if (!hasValidInput) {
    return (
      <div className="flex justify-center p-8 text-gray-400 text-lg font-medium">
        Enter your birth date to discover your planetary alignments
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-4">
          {planets.map((planet, index) => {
            const isActive = planet.name === "Moon" ?
              (day === 7 || day === 11 || month === 7 || month === 11 || year === 7 || year === 11) :
              (planet.energy === day || planet.energy === month || planet.energy === year);
            return (
              <div 
                key={index} 
                className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${isActive ? 'bg-gray-800/50 scale-105' : ''}`}
              >
                <motion.div
                  className="flex items-center justify-center rounded-full w-16 h-16 mb-3"
                  style={{ backgroundColor: tailwindColors[planet.color as keyof typeof tailwindColors] }}
                  animate={isActive ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
                  transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={planet.file}
                      alt={planet.name}
                      className="w-10 h-10 filter brightness-200 contrast-200 drop-shadow-lg"
                      onError={() => console.error(`Failed to load ${planet.file}`)}
                    />
                  </div>
                </motion.div>
                <span className="text-base font-medium text-white mb-1">{planet.name}</span>
                <span className="text-sm text-gray-400">
                  {planet.name === "Moon" ? "7/11" : planet.energy}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
