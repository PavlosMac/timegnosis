'use client';

import { motion } from "framer-motion";
import Image from 'next/image';

const planets = [
  { name: "Mercury", color: "green-500", energy: 8, file: "/planets/Mercury.svg" },
  { name: "Venus", color: "pink-400", energy: 3, file: "/planets/Venus.svg" },
  { name: "Mars", color: "red-600", energy: 4, file: "/planets/mars.svg" },
  { name: "Sun", color: "yellow-500", energy: 1, file: "/planets/Sun.svg" },
  { name: "Saturn", color: "gray-800", energy: 5, file: "/planets/Saturn.svg" },
  { name: "Uranus", color: "blue-300", energy: 22, file: "/planets/Uranus.svg" },
  { name: "Neptune", color: "blue-700", energy: 9, file: "/planets/Neptune.svg" },
  { name: "Pluto", color: "purple-800", energy: 2, file: "/planets/Pluto.svg" },
  { name: "Moon", color: "blue-gray-200", energy: 7, file: "/planets/moon.svg" },
  { name: "Jupiter", color: "orange-800", energy: 6, file: "/planets/Jupiter.svg" }
];

const tailwindColors = {
  "green-500": "#22c55e",
  "orange-600": "#ea580c",
  "red-600": "#dc2626",
  "yellow-500": "#eab308",
  "gray-800": "#1f2937",
  "blue-300": "#60a5fa",
  "blue-700": "#1d4ed8",
  "purple-800": "#5b21b6",
  "blue-gray-200": "#f4f4f5",
  "pink-400": "#f472b6",
  "orange-800": "#9a3412"
};

export default function Planet({ energy }: { energy: number }) {
  const planet = planets.find(p => p.energy === energy);

  if (!planet) return null;

  return (
    <div className="flex flex-col items-center mt-6">
      <motion.div
        className="flex items-center justify-center rounded-full w-20 h-20"
        style={{ backgroundColor: tailwindColors[planet.color as keyof typeof tailwindColors] }}
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <Image
          src={planet.file}
          alt={planet.name}
          width={40}
          height={40}
          className="w-10 h-10 filter brightness-200 contrast-200 drop-shadow-md"
          priority={false}
        />
      </motion.div>
      <div className="mt-2 text-center">
        <div className="text-sm font-semibold">{planet.name}</div>
        <div className="text-xs text-gray-600">Energy: {planet.energy}</div>
      </div>
    </div>
  );
}
