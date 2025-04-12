
'use server'
import Planet from "@/components/Planet";
import { fetchMonthGnosis } from "./actions";


export default async function MonthPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const monthId = parseInt(resolvedParams.id);
  const data = await fetchMonthGnosis(monthId);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Month {monthId}</h1>
      <Planet energy={monthId} />
      {data.subtitle && <h2 className="text-2xl font-bold">{data.subtitle}</h2>}
      {data.content && <p className="mt-4">{data.content}</p>}
    </div>
  );
}