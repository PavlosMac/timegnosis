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