import Planet from "@/components/Planet";
import { fetchGnosis } from "@/mongo/fetchGnosis";

export default async function YearPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const energy = parseInt(resolvedParams.id, 10);
  const data = await fetchGnosis(energy, "year");

  if (!energy) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Year {energy}
        </h1>
        <Planet energy={energy} />
        <p className="mt-8 text-gray-300 text-lg leading-relaxed">{data}</p>
      </div>
    </div>
  );
}