import { readFile } from 'fs/promises';
import path from 'path';

interface GnosisItem {
  id: number;
  title: string;
  energy: number;
  mode: string;
  subtitle: string;
  body: string;
}

const GNOSIS_SEED_PATH = path.join(process.cwd(), 'gnosis-seed.json');

export async function fetchGnosis(energy: number, mode: string): Promise<GnosisItem> {
  try {
    const fileContent = await readFile(GNOSIS_SEED_PATH, 'utf8');
    const data: GnosisItem[] = JSON.parse(fileContent);
    
    // Find item matching energy and mode
    const item = data.find(item => item.energy === energy && item.mode === mode);
    
    if (!item) {
      throw new Error(`No gnosis data found for energy ${energy} and mode ${mode}`);
    }
    
    return item;
  } catch (error) {
    console.error('Error fetching local gnosis data:', error);
    throw error;
  }
}

export async function fetchMonthGnosis(monthId: number): Promise<GnosisItem> {
  // For month pages, we use the same fetchGnosis function with mode "month"
  return fetchGnosis(monthId, 'month');
}