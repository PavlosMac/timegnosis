# Architectural Decisions

This file logs architectural decisions (ADRs) made for TimeGnosis with context and trade-offs.

## Format

Each decision should include:
- Date and ADR number
- Context (why the decision was needed)
- Decision (what was chosen)
- Alternatives considered
- Consequences (trade-offs, implications)

---

## Entries

### ADR-001: Use Local JSON Files for Content Storage (2025-01)

**Context:**
- Originally used MongoDB for storing numerology/astrology content
- Content is relatively static (seed data for readings)
- Wanted simpler deployment without database dependency

**Decision:**
- Use local JSON files (`gnosis-seed.json`, `planets-seed.json`) for content storage
- Keep Mongoose models as legacy/fallback option

**Alternatives Considered:**
- MongoDB Atlas -> Rejected: adds complexity and cost for static content
- Headless CMS -> Rejected: overkill for current needs

**Consequences:**
- Simpler deployment (no database required)
- Content changes require code deployment
- Editor component allows JSON editing via Draft.js interface

### ADR-002: Use Next.js 15 with App Router (2025-01)

**Context:**
- Building a modern React application with SSR capabilities
- Need dynamic routes for numerology readings
- Want good developer experience with TypeScript

**Decision:**
- Use Next.js 15 with App Router architecture
- Use Turbopack for faster development builds

**Alternatives Considered:**
- Pages Router -> Rejected: App Router is the future of Next.js
- Remix -> Rejected: Less ecosystem support, team familiarity with Next.js

**Consequences:**
- Modern React patterns (Server Components, Suspense)
- Better SEO with server-side rendering
- Learning curve for App Router patterns

### ADR-003: Tarot Sub-Pages Use Next.js Routes (2026-01)

**Context:**
- Tarot landing page had multiple sections (reading, significators, chart, guide)
- Originally used client-side state (`useState`) to switch between sections
- Browser back button didn't work, URLs weren't shareable

**Decision:**
- Create dedicated page routes: `/tarot/reading`, `/tarot/significators`, `/tarot/chart`, `/tarot/guide`
- Use Next.js `Link` components for navigation
- Extract shared layout to `TarotPageLayout` component

**Alternatives Considered:**
- Keep client-side routing -> Rejected: poor UX (no back button, no deep links)
- Use hash routing -> Rejected: not SEO-friendly, feels hacky

**Consequences:**
- Each page is independently accessible and shareable
- Browser navigation works correctly
- Shared layout reduces code duplication
- Slightly more files to maintain

### ADR-004: Decanates Data Structured by Month (2026-01)

**Context:**
- Original decanates.ts had date ranges by zodiac sign (e.g., Capricorn Dec 22 - Jan 19)
- Cross-month ranges required complex lookup logic
- Some dates fell through gaps (e.g., Feb 29 on leap years)

**Decision:**
- Restructure `decanatesByMonth` with month as primary key (1-12)
- Each month contains day ranges with their decanate card
- Lookup: first find month, then find day range within month

**Alternatives Considered:**
- Fix cross-month logic -> Rejected: still complex, error-prone
- Use a date library -> Rejected: overkill for simple day/month lookup

**Consequences:**
- Simple O(1) month lookup + O(n) day range search (n ≤ 4 per month)
- No cross-month edge cases
- Leap year (Feb 29) handled by extending Pisces decanate to day 29

### ADR-005: Single Source of Truth for Card Names (2026-01)

**Context:**
- `decanates.ts` used "6 of Disks" format
- `cards.ts` used "Six of Pentacles" format
- Required fragile `normalizeCardName()` function to bridge the gap
- Silent failures when names didn't match

**Decision:**
- `decanates.ts` now uses exact card names matching `cards.ts`
- Removed `normalizeCardName()` function entirely
- Card lookup uses direct name matching

**Alternatives Considered:**
- Keep normalization -> Rejected: fragile, hard to debug
- Store card index instead of name -> Rejected: less readable data

**Consequences:**
- No runtime string transformation needed
- If a name is wrong, `findCardByName()` throws typed error immediately
- Data files are slightly more verbose but more reliable

### ADR-006: Constants and Services for Tarot Logic (2026-01)

**Context:**
- Magic numbers scattered throughout code (22 for Major Arcana, 4 for Fool's root)
- Card lookups used `TAROT_DECK[idx]` directly with no error handling
- Silent `undefined` when index out of bounds

**Decision:**
- Create `constants/index.ts` for all magic numbers
- Create `services/cardLookup.ts` with typed errors (`CardNotFoundError`, `InvalidCardIndexError`)
- Provide both throwing (`findCardByName`) and safe (`findCardByNameSafe`) variants

**Alternatives Considered:**
- Inline comments for magic numbers -> Rejected: still requires updating in multiple places
- Return null on errors -> Rejected: silent failures are hard to debug

**Consequences:**
- Single place to update numerology constants
- Errors are caught at lookup time with clear messages
- Slightly more verbose code but much safer

<!-- Add new decision entries below this line -->
