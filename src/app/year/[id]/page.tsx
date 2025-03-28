import { fetchGnosis } from "@/mongo/fetchGnosis";

export default async function YearPage({ params }: { params: { id: string } }) {
  const energy = parseInt(params.id, 10);
  const data = await fetchGnosis(energy, "year");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Year {energy}</h1>
      <p className="mt-4">{data}</p>
    </div>
  );
}