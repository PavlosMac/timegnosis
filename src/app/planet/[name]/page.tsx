import { fetchPlanetByName } from '@/lib/fetchLocalPlanets';
import StaticPlanet from '@/components/StaticPlanet';
import Link from 'next/link';

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


type Params = Promise<{ name: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const resolvedParams = await params;
  const data = await fetchPlanetByName(resolvedParams.name);
  return {
    title: data.title || `${resolvedParams.name} | TimeGnosis`,
    description: data.body?.slice(0, 160) || `Astrology and numerology for planet ${resolvedParams.name}`,
    openGraph: {
      title: data.title || `${resolvedParams.name} | TimeGnosis`,
      description: data.body?.slice(0, 160) || `Astrology and numerology for planet ${resolvedParams.name}`,
    }
  };
}

export default async function PlanetPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const data = await fetchPlanetByName(resolvedParams.name);
  const planet = planets.find(p => p.name === resolvedParams.name.toLowerCase());

  if (!planet) return null;

  return (
    <div className="min-h-screen relative">
      {/* Atmospheric vignette backdrop */}
      <div className="fixed inset-0 vignette z-0" />

      {/* Constellation overlays for atmosphere */}
      <div className="fixed inset-0 constellation-gold opacity-30 z-0" />
      <div className="fixed inset-0 constellation-violet opacity-20 z-0" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-8 animate-fade-in">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--mystical-gold)] hover:text-[var(--mystical-gold-light)]
                     transition-colors duration-300 mb-6 mystical-body"
        >
          <span className="text-sm">&#8592;</span>
          <span>Return to the Cosmos</span>
        </Link>

        {/* Mystical container with ornate corners */}
        <div className="mystical-container ornate-corners relative overflow-hidden">
          {/* Bottom ornate corners - implemented as child div */}
          <div className="ornate-corners-bottom absolute inset-0 pointer-events-none" />

          {/* Corner star decorations */}
          <div className="absolute top-4 left-4 text-[var(--mystical-gold)] text-lg opacity-60">&#10022;</div>
          <div className="absolute top-4 right-4 text-[var(--mystical-gold)] text-lg opacity-60">&#10022;</div>
          <div className="absolute bottom-4 left-4 text-[var(--mystical-gold)] text-lg opacity-60">&#10022;</div>
          <div className="absolute bottom-4 right-4 text-[var(--mystical-gold)] text-lg opacity-60">&#10022;</div>

          {/* Inner mystical glow */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.2), transparent 60%)'
            }}
          />

          {/* Content wrapper */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12">
            {/* Planet title */}
            <div className="text-center mb-8">
              <h1 className="mystical-heading text-3xl sm:text-4xl md:text-5xl uppercase animate-text-glow">
                {data.title}
              </h1>

              {/* Decorative divider */}
              <div className="mystical-divider mt-4">
                <span className="text-[var(--mystical-gold)] text-xl">&#10022;</span>
              </div>
            </div>

            {/* Planet icon with mystical glow */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Outer glow ring */}
                <div
                  className="absolute -inset-4 rounded-full animate-glow"
                  style={{
                    background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)'
                  }}
                />
                {/* Secondary glow pulse */}
                <div
                  className="absolute -inset-8 rounded-full opacity-50"
                  style={{
                    background: 'radial-gradient(circle, rgba(138,43,226,0.2) 0%, transparent 60%)'
                  }}
                />
                {/* Planet component */}
                <div className="relative z-10">
                  <StaticPlanet energy={data.energy} />
                </div>
              </div>
            </div>

            {/* Energy number badge */}
            <div className="flex justify-center mb-8">
              <div className="mystical-border px-6 py-2 rounded-full">
                <span className="mystical-subheading text-sm uppercase tracking-widest">
                  Sacred Number: <span className="text-[var(--mystical-gold)]">{data.energy}</span>
                </span>
              </div>
            </div>

            {/* Decorative divider */}
            <div className="mystical-divider my-8">
              <span className="text-[var(--mystical-gold)] text-lg">&#8226; &#10022; &#8226;</span>
            </div>

            {/* Planet description */}
            <div className="max-w-2xl mx-auto">
              <p className="mystical-body text-lg sm:text-xl leading-relaxed text-center whitespace-pre-wrap">
                {data.body}
              </p>
            </div>

            {/* Bottom decorative element */}
            <div className="mt-10 flex justify-center">
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--mystical-gold)]" />
                <svg className="w-6 h-10 text-[var(--mystical-gold)]" viewBox="0 0 40 64" fill="none">
                  {/* Ankh symbol */}
                  <circle cx="20" cy="14" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7"/>
                  <line x1="20" y1="22" x2="20" y2="56" stroke="currentColor" strokeWidth="2.5" opacity="0.7"/>
                  <line x1="8" y1="32" x2="32" y2="32" stroke="currentColor" strokeWidth="2.5" opacity="0.7"/>
                </svg>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--mystical-gold)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer mystical text */}
        <div className="text-center mt-8">
          <p className="mystical-flavor text-sm opacity-60">
            "As above, so below; as within, so without."
          </p>
        </div>
      </div>
    </div>
  );
}
