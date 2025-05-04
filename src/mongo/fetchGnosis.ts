"use server";

import { cache } from "react";
import dbConnect from "@/lib/mongodb";
import gnosis from "@/models/gnosis";
import planet from "@/models/planet";

await dbConnect();

export type GnosisData = {
  title: string;
  subtitle: string;
  body: string;
  energy: number;
};

export const fetchGnosis = cache(async (num: number, time: "day" | "month" | "year"): Promise<GnosisData> => {
  try {
    const g = await gnosis.findOne({ mode: time, energy: num });
    
    if (!g) {
      return {
        title: "Not Found",
        subtitle: "No data available for this energy number.",
        body: "No data found.",
        energy: num
      };
    }

    return {
      title: g.title,
      subtitle: g.subtitle,
      body: g.body,
      energy: g.energy
    };
  } catch (e) {
    console.error(e);
    return {
      title: "Error",
      subtitle: "Error fetching data",
      body: "Error fetching data.",
      energy: num
    };
  }
});

export type PlanetDescription = {
  title: string;
  body: string;
};

export const fetchPlanetDescription = cache(async (planetName: string): Promise<PlanetDescription> => {
  try {
    const p = await planet.findOne({ planet: planetName.toLowerCase() });

    if (!p) {
      return { 
        title: "Not Found", 
        body: "No planet description found." 
      };
    }

    return { title: p.title, body: p.body };
  } catch (e) {
    console.error(e);
    return { 
      title: "Error", 
      body: "Error fetching planet description." 
    };
  }
});
