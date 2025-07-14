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

export async function fetchPlanetByName(planetName: string): Promise<PlanetItem> {
  try {
    const fileContent = await readFile(PLANETS_SEED_PATH, 'utf8');
    const data: PlanetItem[] = JSON.parse(fileContent);
    
    // Find planet by name (case insensitive)
    const planet = data.find(item => item.planet.toLowerCase() === planetName.toLowerCase());
    
    if (!planet) {
      throw new Error(`No planet data found for ${planetName}`);
    }
    
    return planet;
  } catch (error) {
    console.error('Error fetching local planet data:', error);
    throw error;
  }
}

export async function fetchPlanetByEnergy(energy: number): Promise<PlanetItem> {
  try {
    const fileContent = await readFile(PLANETS_SEED_PATH, 'utf8');
    const data: PlanetItem[] = JSON.parse(fileContent);
    
    // Find planet by energy value
    const planet = data.find(item => item.energy === energy);
    
    if (!planet) {
      throw new Error(`No planet data found for energy ${energy}`);
    }
    
    return planet;
  } catch (error) {
    console.error('Error fetching local planet data:', error);
    throw error;
  }
}

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