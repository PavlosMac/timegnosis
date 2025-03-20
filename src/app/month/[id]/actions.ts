"use server";
import dbConnect from "@/app/lib/mongodb";
import gnosis from "@/app/models/gnosis";

await dbConnect();

export const fetchGnosis = async (timeId: string)  => {
    console.log("Fetching data for time_id:", timeId);
    try {
        const g = await gnosis.findOne({ mode: "month", energy: 1 });
        console.log(g.body)
        return g.body
    
    } catch(e) {
        console.error(e)
    }

    return null;

}
