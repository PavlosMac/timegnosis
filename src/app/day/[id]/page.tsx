import Planet from "@/components/Planet";
import { fetchGnosis } from "@/mongo/fetchGnosis";

export default async function DayPage({ params }: { params: { id: string } }) {
  const p =  await params;
  const data = await fetchGnosis(parseInt(p.id), "day");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Day {p.id}</h1>
      <Planet energy={parseInt(p.id)} />

      <p className="mt-4">{data}</p>
    </div>
  );
}
