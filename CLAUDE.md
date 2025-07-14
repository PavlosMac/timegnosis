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

## Architecture

### Data Architecture
The application supports two data sources:
1. **Local JSON files** (current implementation):
   - `gnosis-seed.json` - Contains numerology content for days, months, and years
   - `planets-seed.json` - Contains planetary information and associations
2. **MongoDB** (legacy/fallback):
   - Mongoose models in `src/models/` for Gnosis and Planet collections
   - Connection utilities in `src/mongo/`

### Key Components

- **HomeClient** (`src/components/HomeClient.tsx`): Main client component handling date input and numerology calculations
- **Numerology Logic**: Personal day/month/year calculations using digit reduction (except master numbers 11, 22)
- **Dynamic Pages**: 
  - `/day/[id]` - Personal day readings
  - `/month/[id]` - Personal month readings  
  - `/year/[id]` - Personal year readings
  - `/planet/[name]` - Planetary information
- **Editor** (`src/app/editor/page.tsx`): Draft.js-based content management for JSON seed files

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

### Current Branch Context
Working on `implement-local-data` branch to migrate from MongoDB to local JSON files for content storage.