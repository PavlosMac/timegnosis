
'use server'
import { fetchGnosis } from "./actions";

export default async function MonthPage({ params }: { params?: { id?: number } }) {
    const p = await params;
    if (!p || !p.id) {
        return <p>Invalid ID</p>;
    }

    const body = await fetchGnosis(p.id);
    console.log(body)
    if (!body) {
        return <p>No data found for this time_id</p>;
    }

    return <p>{body}</p>;
}