import { fetchPlanet } from '@/mongo/fetchPlanet';
import StaticPlanet from '@/components/StaticPlanet';

export default async function PlanetPage({ params }: { params: { name: string } }) {
  const resolvedParams = await params;
  const data = await fetchPlanet(resolvedParams.name);

  console.log(data)

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-white">{data.title}</h1>
        <StaticPlanet energy={data.energy} />
        <div className="prose prose-invert max-w-none mt-6">
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{data.body}</p>
        </div>
      </div>
    </div>
  );
}
