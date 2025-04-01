"use server";

import { fetchGnosis } from "@/mongo/fetchGnosis";

export const fetchMonthGnosis = async (timeId: number)  => {
    try {
        const body = await fetchGnosis(timeId, 'month');
        return body;
    
    } catch(e) {
        console.error(e)
    }

    return null;

}
