import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import sanitizeHtml from 'sanitize-html';

// Sanitization config - allow basic HTML formatting but strip dangerous content
const sanitizeConfig: sanitizeHtml.IOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span'],
  allowedAttributes: {
    'a': ['href', 'title'],
    'span': ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  disallowedTagsMode: 'discard',
};

// Sanitize a string value
function sanitizeContent(content: string): string {
  return sanitizeHtml(content, sanitizeConfig);
}

export const dynamic = 'force-dynamic';

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

interface BlogContentBlock {
  type: 'paragraph' | 'image';
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  content: BlogContentBlock[];
}

const GNOSIS_SEED_PATH = path.join(process.cwd(), 'gnosis-seed.json');
const PLANETS_SEED_PATH = path.join(process.cwd(), 'planets-seed.json');
const BLOG_POSTS_PATH = path.join(process.cwd(), 'src/app/blog-json/222.json');

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');
    const id = searchParams.get('id');
    
    if (!file || !['gnosis', 'planets', 'blog'].includes(file)) {
      return NextResponse.json({ error: 'Invalid file parameter' }, { status: 400 });
    }
    
    const filePath = file === 'gnosis' ? GNOSIS_SEED_PATH : file === 'planets' ? PLANETS_SEED_PATH : BLOG_POSTS_PATH;
    const fileContent = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    if (id) {
      // Return specific item
      let item;
      if (file === 'gnosis') {
        item = (data as GnosisItem[]).find((item) => item.id === parseInt(id));
      } else if (file === 'planets') {
        item = (data as PlanetItem[]).find((item) => item.planet === id);
      } else {
        item = (data as BlogPost[]).find((item) => item.id === id);
      }
      
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
    const { file, id, body, content } = await request.json();
    
    if (!file || !['gnosis', 'planets', 'blog'].includes(file)) {
      return NextResponse.json({ error: 'Invalid file parameter' }, { status: 400 });
    }
    
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    
    const filePath = file === 'gnosis' ? GNOSIS_SEED_PATH : file === 'planets' ? PLANETS_SEED_PATH : BLOG_POSTS_PATH;
    const fileContent = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Find and update the item
    let itemIndex;
    if (file === 'gnosis') {
      itemIndex = (data as GnosisItem[]).findIndex((item) => item.id === parseInt(id));
    } else if (file === 'planets') {
      itemIndex = (data as PlanetItem[]).findIndex((item) => item.planet === id);
    } else {
      itemIndex = (data as BlogPost[]).findIndex((item) => item.id === id);
    }
    
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    // Update the content (sanitized to prevent XSS)
    if (file === 'blog') {
      // For blog posts, update the entire content array with sanitized text
      if (content) {
        const sanitizedContent = (content as BlogContentBlock[]).map(block => {
          if (block.type === 'paragraph' && block.text) {
            return { ...block, text: sanitizeContent(block.text) };
          }
          if (block.type === 'image') {
            return {
              ...block,
              alt: block.alt ? sanitizeContent(block.alt) : block.alt,
              caption: block.caption ? sanitizeContent(block.caption) : block.caption,
            };
          }
          return block;
        });
        (data as BlogPost[])[itemIndex].content = sanitizedContent;
      }
    } else {
      // For gnosis/planets, update the body field with sanitized content
      if (body) {
        data[itemIndex].body = sanitizeContent(body);
      }
    }
    
    // Write back to file
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, item: data[itemIndex] });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
  }
}