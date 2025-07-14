export const dynamic = "force-static";
import StaticPlanet from "@/components/StaticPlanet";
import { gnosisBodyTextClass } from "@/styles/textClassNames";
import { fetchGnosis } from "@/lib/fetchLocalGnosis";
type Props = { params: Promise<{ id: string }> };


export async function generateMetadata({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const energy = parseInt(resolvedParams.id, 10);
  const data = await fetchGnosis(energy, "year");
  return {
    title: data.title || `Year ${resolvedParams.id} | TimeGnosis`,
    description: data.subtitle || data.body?.slice(0, 160) || `Numerology and astrology for year energy ${resolvedParams.id}`,
    openGraph: {
      title: data.title || `Year ${resolvedParams.id} | TimeGnosis`,
      description: data.subtitle || data.body?.slice(0, 160) || `Numerology and astrology for year energy ${resolvedParams.id}`,
    }
  };
}

export default async function YearPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const energy = parseInt(resolvedParams.id, 10);
  const data = await fetchGnosis(energy, "year");

  if (!energy) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-white text-center">{data.title}</h1>
        <StaticPlanet energy={energy} />
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">{data.subtitle}</h2>
          <div className="prose prose-invert max-w-none">
            <p className={gnosisBodyTextClass}>{data.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}