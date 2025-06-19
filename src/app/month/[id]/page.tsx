
export const dynamic = "force-static";
import StaticPlanet from "@/components/StaticPlanet";
import { gnosisBodyTextClass } from "@/styles/textClassNames";
import { fetchMonthGnosis } from "./actions";


type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: { id: string } }) {
  const monthId = parseInt(params.id);
  const data = await fetchMonthGnosis(monthId);
  return {
    title: data.title || `Month ${params.id} | TimeGnosis`,
    description: data.subtitle || data.body?.slice(0, 160) || `Numerology and astrology for month energy ${params.id}`,
    openGraph: {
      title: data.title || `Month ${params.id} | TimeGnosis`,
      description: data.subtitle || data.body?.slice(0, 160) || `Numerology and astrology for month energy ${params.id}`,
    }
  };
}

export default async function MonthPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const monthId = parseInt(resolvedParams.id);
  const data = await fetchMonthGnosis(monthId);

  if (!monthId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-white text-center">{data.title}</h1>
        <StaticPlanet energy={monthId} />
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