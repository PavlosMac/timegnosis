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

export const fetchGnosis = async (energy: number, mode: string): Promise<GnosisItem | null> => {
  try {
    const fileContent = await readFile(GNOSIS_SEED_PATH, 'utf8');
    const data: GnosisItem[] = JSON.parse(fileContent);

    // Find item matching energy and mode
    const item = data.find(item => item.energy === energy && item.mode === mode);

    return item || null;
  } catch (error) {
    console.error('Error reading gnosis seed file:', error);
    throw error;
  }
};

export const fetchMonthGnosis = async (monthId: number): Promise<GnosisItem | null> => {
  return fetchGnosis(monthId, 'month');
};