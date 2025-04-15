import dbConnect from "@/lib/mongodb";
import Planet from "@/models/planet";

export type PlanetData = {
  name: string;
  title: string;
  body: string;
  energy: number;
};

export const fetchPlanet = async (name: string): Promise<PlanetData> => {
  try {
    await dbConnect();
    const planet = await Planet.findOne({ planet: name.toLowerCase() });
    
    if (!planet) {
      return {
        name,
        title: `Planet ${name}`,
        body: `Description for ${name} not found.`,
        energy: 0
      };
    }

    return {
      name: planet.planet,
      title: planet.title,
      body: planet.body,
      energy: planet.energy
    };
  } catch (error) {
    console.error("Error fetching planet:", error);
    throw error;
  }
};
