"use server";
import dbConnect from "@/lib/mongodb";
import gnosis from "@/models/gnosis";

await dbConnect();

export const fetchGnosis = async (timeId: string)  => {
    try {
        const g = await gnosis.findOne({ mode: "month", energy: 1 });
        console.log(g.body)
        return g.body
    
    } catch(e) {
        console.error(e)
    }

    return null;

}
