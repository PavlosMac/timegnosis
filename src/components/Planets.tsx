import { motion } from "framer-motion";

const planets = [
  { name: "Mercury", color: "gray", energy: 8, file: "/planets/Mercury.svg"  },
  { name: "Venus", color: "yellow", energy: 3,file: "/planets/Mercury.svg" },
  { name: "Mars", color: "red", energy: 4, file: "/planets/Mercury.svg" },
  { name: "Sun", color: "orange", energy: 1, file: "/planets/Mercury.svg" },
  { name: "Saturn", color: "gold", energy: 5, file: "/planets/Mercury.svg" },
  { name: "Uranus", color: "cyan", energy: 7, file: "/planets/Mercury.svg" },
  { name: "Neptune", color: "darkblue", energy: 9, file: "/planets/Mercury.svg" },
  { name: "Moon", color: "blue", energy: 7, file: "/planets/Mercury.svg" }
];

export default function Planets({ day, month, year }: { day: number; month: number; year: number }) {
  return (
    <div className="flex justify-center gap-4 p-4">
      {planets.map((planet, index) => {
  const isActive = planet.energy === day || planet.energy === month || planet.energy === year;
  return (
    <div key={index} className="flex flex-col items-center">
      <motion.div
        className="flex items-center justify-center rounded-full w-14 h-14"
        style={{ backgroundColor: planet.color }}
        animate={isActive ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
        transition={isActive ? { repeat: Infinity, duration: 1 } : {}}
      >
        <img
          src={planet.file}
          alt={planet.name}
          className="w-8 h-8"
          onError={() => console.error(`Failed to load ${planet.file}`)}
        />
      </motion.div>
      <span className="text-sm text-gray-800 mt-1">{planet.name}</span>
    </div>
  );
})}
    </div>
  );
}
