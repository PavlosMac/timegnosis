import { fetchPlanet } from '@/mongo/fetchPlanet';
import StaticPlanet from '@/components/StaticPlanet';
import Image from 'next/image';

const planets = [
  { name: "mercury", color: "green-500", energy: 8, file: "/planets/Mercury.svg" },
  { name: "venus", color: "pink-400", energy: 3, file: "/planets/Venus.svg" },
  { name: "mars", color: "red-600", energy: 4, file: "/planets/Annoy.svg" },
  { name: "sun", color: "yellow-500", energy: 1, file: "/planets/Sun.svg" },
  { name: "saturn", color: "gray-800", energy: 5, file: "/planets/Saturn.svg" },
  { name: "uranus", color: "blue-300", energy: 22, file: "/planets/Uranus.svg" },
  { name: "neptune", color: "blue-700", energy: 9, file: "/planets/Neptune.svg" },
  { name: "pluto", color: "purple-800", energy: 2, file: "/planets/Pluto.svg" },
  { name: "moon", color: "blue-gray-200", energy: 7, file: "/planets/moon.svg" },
  { name: "jupiter", color: "orange-800", energy: 6, file: "/planets/Jupiter.svg" }
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

type Params = Promise<{ name: string }>

export default async function PlanetPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const data = await fetchPlanet(resolvedParams.name);
  const planet = planets.find(p => p.name === resolvedParams.name.toLowerCase());

  if (!planet) return null;

  console.log('Loading planet SVG:', planet.file);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="relative bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-2">
            <div
              className="flex items-center justify-center rounded-full mr-4"
              style={{
                backgroundColor: tailwindColors[planet.color as keyof typeof tailwindColors] || '#222',
                width: 64,
                height: 64,
                minWidth: 64,
                minHeight: 64,
                boxShadow: '0 2px 12px 2px rgba(0,0,0,0.15)'
              }}
            >
              <Image
                src={planet.file}
                alt={planet.name}
                width={54}
                height={54}
                className="drop-shadow-none"
                priority={false}
              />
            </div>
            <h1 className="text-3xl font-bold text-white">{data.title}</h1>
          </div>
          <StaticPlanet energy={data.energy} />
          <div className="prose prose-invert max-w-none mt-6">
            <p className="text-gray-100 whitespace-pre-wrap leading-relaxed">{data.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
