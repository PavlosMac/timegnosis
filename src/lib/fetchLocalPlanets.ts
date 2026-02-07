import { readFile } from 'fs/promises';
import path from 'path';

interface PlanetItem {
  planet: string;
  title: string;
  energy: number;
  image: string;
  body: string;
}

const PLANETS_SEED_PATH = path.join(process.cwd(), 'planets-seed.json');

export const fetchPlanetByName = async (planetName: string): Promise<PlanetItem | null> => {
  try {
    const fileContent = await readFile(PLANETS_SEED_PATH, 'utf8');
    const data: PlanetItem[] = JSON.parse(fileContent);

    // Find planet by name (case insensitive)
    const planet = data.find(item => item.planet.toLowerCase() === planetName.toLowerCase());

    return planet || null;
  } catch (error) {
    console.error('Error reading planets seed file:', error);
    throw error;
  }
};

export const fetchPlanetByEnergy = async (energy: number): Promise<PlanetItem | null> => {
  try {
    const fileContent = await readFile(PLANETS_SEED_PATH, 'utf8');
    const data: PlanetItem[] = JSON.parse(fileContent);

    // Find planet by energy value
    const planet = data.find(item => item.energy === energy);

    return planet || null;
  } catch (error) {
    console.error('Error reading planets seed file:', error);
    throw error;
  }
};

export async function getAllPlanets(): Promise<PlanetItem[]> {
  try {
    const fileContent = await readFile(PLANETS_SEED_PATH, 'utf8');
    const data: PlanetItem[] = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error('Error fetching all planets data:', error);
    throw error;
  }
}