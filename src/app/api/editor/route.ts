import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

interface GnosisItem {
  id: number;
  title: string;
  energy: number;
  mode: string;
  subtitle: string;
  body: string;
}

interface PlanetItem {
  planet: string;
  title: string;
  energy: number;
  image: string;
  body: string;
}

const GNOSIS_SEED_PATH = path.join(process.cwd(), 'gnosis-seed.json');
const PLANETS_SEED_PATH = path.join(process.cwd(), 'planets-seed.json');

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');
    const id = searchParams.get('id');
    
    if (!file || !['gnosis', 'planets'].includes(file)) {
      return NextResponse.json({ error: 'Invalid file parameter' }, { status: 400 });
    }
    
    const filePath = file === 'gnosis' ? GNOSIS_SEED_PATH : PLANETS_SEED_PATH;
    const fileContent = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    if (id) {
      // Return specific item
      const item = file === 'gnosis' 
        ? (data as GnosisItem[]).find((item) => item.id === parseInt(id))
        : (data as PlanetItem[]).find((item) => item.planet === id);
      
      if (!item) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
      }
      
      return NextResponse.json({ item });
    }
    
    // Return all items (for selection interface)
    return NextResponse.json({ items: data });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { file, id, body } = await request.json();
    
    if (!file || !['gnosis', 'planets'].includes(file)) {
      return NextResponse.json({ error: 'Invalid file parameter' }, { status: 400 });
    }
    
    if (!id || !body) {
      return NextResponse.json({ error: 'Missing id or body' }, { status: 400 });
    }
    
    const filePath = file === 'gnosis' ? GNOSIS_SEED_PATH : PLANETS_SEED_PATH;
    const fileContent = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Find and update the item
    const itemIndex = file === 'gnosis' 
      ? (data as GnosisItem[]).findIndex((item) => item.id === parseInt(id))
      : (data as PlanetItem[]).findIndex((item) => item.planet === id);
    
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    // Update the body field
    data[itemIndex].body = body;
    
    // Write back to file
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, item: data[itemIndex] });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
  }
}