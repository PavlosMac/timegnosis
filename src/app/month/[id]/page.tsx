
'use server'
import { fetchMonthGnosis } from "./actions";


export default async function MonthPage({ params }: { params: { id: number } }) {
  const energy = await params;
  const data = await fetchMonthGnosis(energy.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Month {energy.id}</h1>
      <h2 className="text-2xl font-bold">{data.subtitle}</h2>
      <p className="mt-4">{data}</p>
    </div>
  );
}