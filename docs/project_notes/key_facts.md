# Key Facts

This file stores project configuration, constants, and frequently-needed non-sensitive information for TimeGnosis.

## Security Warning

**NEVER store passwords, API keys, or sensitive credentials in this file.** Store secrets in `.env` files (excluded via `.gitignore`) or environment variables.

---

## Project Information

**Repository:**
- Name: TimeGnosis
- Framework: Next.js 15 with App Router
- Language: TypeScript
- Styling: Tailwind CSS 4

## Local Development

**Ports:**
- Development Server: `3000` (default Next.js)

**Commands:**
- Start dev server: `npm run dev` (uses Turbopack)
- Build: `npm run build`
- Start production: `npm start`
- Lint: `npm run lint`

## Data Architecture

**Content Storage:**
- Primary: Local JSON files in project root
  - `gnosis-seed.json` - Numerology content (days, months, years)
  - `planets-seed.json` - Planetary information and associations
- Legacy: MongoDB via Mongoose (fallback)

**Key Routes:**
- `/` - Home page with date input
- `/day/[id]` - Personal day readings
- `/month/[id]` - Personal month readings
- `/year/[id]` - Personal year readings
- `/planet/[name]` - Planetary information
- `/editor` - Content editor (Draft.js)
- `/tarot` - Tarot divination landing page

## Numerology Logic

**Calculation Method:**
- Personal numbers calculated using digit reduction
- Master numbers (11, 22) are NOT reduced
- Birth date used as base for all calculations

## Important URLs

**Documentation:**
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

<!-- Add new key facts below this line -->
