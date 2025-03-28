"use server";

import dbConnect from "@/lib/mongodb";
import gnosis from "@/models/gnosis";

await dbConnect();

export const fetchGnosis = async (num: number, time: "day" | "month" | "year") => {
  try {
    const g = await gnosis.findOne({ mode: time, energy: num });

    if (!g) {
      return "No data found.";
    }

    return g.body;
  } catch (e) {
    console.error(e);
    return "Error fetching data.";
  }
};
