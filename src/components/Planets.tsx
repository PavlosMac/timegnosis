import { motion } from "framer-motion";

const planets = [
  { name: "Mercury", color: "gray", energy: 8 },
  { name: "Venus", color: "yellow", energy: 3 },
  { name: "Mars", color: "red", energy: 4 },
  { name: "Sun", color: "orange", energy: 1 },
  { name: "Saturn", color: "gold", energy: 5 },
  { name: "Uranus", color: "cyan", energy: 7 },
  { name: "Neptune", color: "darkblue", energy: 9 },
  { name: "Moon", color: "darkblue", energy: 7 }
];

export default function Planets({ day, month, year }: { day: number; month: number; year: number }) {
  return (
    <div className="flex justify-center gap-4 p-4">
      {planets.map((planet, index) => {
        const isActive = planet.energy === day || planet.energy === month || planet.energy === year;
        return (
          <div key={index} className="flex flex-col items-center">
            <motion.svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill={planet.color}
              xmlns="http://www.w3.org/2000/svg"
              animate={isActive ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
              transition={isActive ? { repeat: Infinity, duration: 1 } : {}}
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            </motion.svg>
            <span className="text-sm text-gray-800">{planet.name}</span>
          </div>
        );
      })}
    </div>
  );
}
