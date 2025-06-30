import dbReady from "@/lib/dbReady";
import Planet from "@/models/planet";

export type PlanetData = {
  name: string;
  title: string;
  body: string;
  energy: number;
};

export const fetchPlanet = async (name: string): Promise<PlanetData> => {
  try {
    await dbReady; 
    const planet = await Planet
        .findOne({ planet: name.toLowerCase() })
        .select('planet title body energy')
        .lean<{
          planet: string;
          title: string;
          body: string;
          energy: number;
        }>();
        
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
