# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TimeGnosis is a Next.js 15 application that provides numerology calculations and astrological insights. The app calculates personal day, month, and year numbers based on user birth dates and displays corresponding mystical content with planetary associations.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Code style

### General
- Follow TypeScript strict mode
- Use functional components with TypeScript interfaces
- Prefer composition over inheritance
- Keep components small and focused
- use es6 syntax and features
- use es6 fat arrow functions
- use es6 destructuring

### State Management
- URL parameters for sharing numerology calculations
- localStorage for persisting user birth date across sessions
- Client-side numerology calculations with server-side content fetching

### Content Management
- JSON seed files edited through Draft.js editor interface
- API route `/api/editor` handles reading/writing seed files
- Content includes title, subtitle, body text, energy numbers, and modes

### Styling
- Tailwind CSS 4 with custom configuration
- Dark theme with astrology-inspired design
- Responsive layout with mobile-first approach
- Background astrology wheel SVG on desktop

## Project Memory System

This project maintains institutional knowledge in `docs/project_notes/` for consistency across sessions.

### Memory Files

- **bugs.md** - Bug log with dates, solutions, and prevention notes
- **decisions.md** - Architectural Decision Records (ADRs) with context and trade-offs
- **key_facts.md** - Project configuration, ports, important URLs
- **issues.md** - Work log with branch names, descriptions, and status

### Memory-Aware Protocols

**Before proposing architectural changes:**
- Check `docs/project_notes/decisions.md` for existing decisions
- Verify the proposed approach doesn't conflict with past choices
- If it does conflict, acknowledge the existing decision and explain why a change is warranted

**When encountering errors or bugs:**
- Search `docs/project_notes/bugs.md` for similar issues
- Apply known solutions if found
- Document new bugs and solutions when resolved

**When looking up project configuration:**
- Check `docs/project_notes/key_facts.md` for ports, URLs, and configuration
- Prefer documented facts over assumptions

**When completing work:**
- Log completed work in `docs/project_notes/issues.md`
- Include date, branch name, brief description, and status

**When user requests memory updates:**
- Update the appropriate memory file (bugs, decisions, key_facts, or issues)
- Follow the established format and style (bullet lists, dates, concise entries)


## Next.js 
Follow nextjs standards for using server or client components.

## Next.js Data Fetching

Follow Next.js 15+ data fetching patterns:

### Server Components
```typescript
// With fetch API (not cached by default)
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // opt into dynamic rendering
  })
  const result = await data.json()
  return <div>{result}</div>
}

// With ORM/database
async function Page() {
  const posts = await db.select().from(posts)
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

### Client Components
```typescript
// With use() hook - stream from server
'use client'
import { use } from 'react'

function Posts({ posts }: { posts: Promise<Post[]> }) {
  const allPosts = use(posts) // unwrap promise
  return <ul>{allPosts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}

// Parent Server Component passes promise (don't await)
function Page() {
  const posts = getPosts() // don't await
  return (
    <Suspense fallback={<Loading />}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

### Streaming
```typescript
// Option 1: loading.js - streams entire page
// app/blog/loading.tsx
export default function Loading() {
  return <Skeleton />
}

// Option 2: <Suspense> - granular streaming
<Suspense fallback={<Skeleton />}>
  <BlogList />
</Suspense>
```

### Patterns
```typescript
// Parallel fetching
const [artist, albums] = await Promise.all([
  getArtist(id),
  getAlbums(id)
])

// Sequential (when dependent)
const artist = await getArtist(id)
const playlists = await getPlaylists(artist.id)

// Preloading
const preload = (id) => void getItem(id)
preload(id) // start loading early
const isAvailable = await checkAvailable()
```

### Deduplication
```typescript
// For fetch - automatic request memoization
// For ORM/database - use React cache
import { cache } from 'react'

export const getPost = cache(async (id: string) => {
  return await db.query.posts.findFirst({ where: eq(posts.id, id) })
})
```