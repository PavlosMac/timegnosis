"use server";

import { fetchGnosis, GnosisData } from "@/mongo/fetchGnosis";

export async function fetchMonthGnosis(monthId: number): Promise<GnosisData> {
  try {
    return await fetchGnosis(monthId, "month");
  } catch(e) {
    console.error(e);
    return {
      title: "Error",
      subtitle: "Error loading month data",
      body: "An error occurred while loading the month data.",
      energy: monthId
    };
  }
}
