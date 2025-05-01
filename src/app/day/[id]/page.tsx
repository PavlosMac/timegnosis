export const dynamic = "force-static";
import StaticPlanet from "@/components/StaticPlanet";
import { fetchGnosis } from "@/mongo/fetchGnosis";

export default async function DayPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const energy = parseInt(resolvedParams.id, 10);
  const data = await fetchGnosis(energy, "day");

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
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{data.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
