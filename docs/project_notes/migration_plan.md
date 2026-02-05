# Plan: Split TimeGnosis into Two Separate Projects

## Summary
Create a new sibling project `tarot-divinations` by extracting the tarot module from the current timegnosis project. Each project gets its own Docker image, deployment config, and domain.

## Project Structure After Split

```
/Users/pavlosmacdonald-kosmidis/projects/private/timegnosis/
├── timegnosis/              # Existing - numerology app (unchanged location)
└── tarot-divinations/       # NEW - tarot app
```

## Docker Images
- **timegnosis**: `pavlos888/timegnosis-next-app:latest` (existing)
- **tarot**: `pavlos888/tarot-nextjs:latest` (new)

---

## Step 1: Create tarot-divinations Project

### 1.1 Copy project skeleton
```bash
cp -r timegnosis ../tarot-divinations
```

### 1.2 Remove non-tarot files from tarot-divinations

**Delete these directories:**
- `src/app/day/`
- `src/app/month/`
- `src/app/year/`
- `src/app/planet/`
- `src/app/numerology/`
- `src/app/blog/`
- `src/app/blog-json/`
- `src/app/editor/`
- `src/app/api/`
- `src/app/components/` (all shared components - HomeClient, NavBar, Planets, etc.)
- `src/lib/fetchLocalGnosis.ts`
- `src/lib/fetchLocalPlanets.ts`
- `src/lib/blog-blueprint.tsx`
- `src/styles/`
- `public/planets/`
- `public/blog/`
- `gnosis-seed.json`
- `planets-seed.json`
- `docs/` (project memory - start fresh)

**Keep these files:**
- `src/app/tarot/` (entire directory)
- `src/lib/crypto-random.ts`
- `src/lib/readings-config.json`
- `Dockerfile`
- `docker-compose.yml` (will modify)
- `deploy-to-pi.sh` (will modify)
- `next.config.ts` (will simplify)
- `package.json` (will trim dependencies)
- `tailwind.config.ts`
- `tsconfig.json`
- `.dockerignore`
- `.gitignore`

### 1.3 Restructure tarot app routes

Move tarot from `/tarot` to root `/`:
- `src/app/tarot/page.tsx` → `src/app/page.tsx`
- `src/app/tarot/reading/` → `src/app/reading/`
- `src/app/tarot/guide/` → `src/app/guide/`
- `src/app/tarot/chart/` → `src/app/chart/`
- `src/app/tarot/significators/` → `src/app/significators/`
- Move components, utils, services, constants to `src/app/`
- Update all imports from `@/app/tarot/...` to `@/app/...`

### 1.4 Update tarot layout.tsx
- Keep Google Analytics (tarot app keeps analytics)
- Keep Cinzel + Crimson_Pro fonts
- Import tarot.css
- Remove astro_wheel.svg background

### 1.5 Update tarot globals.css
- Keep only tarot-relevant styles
- Remove numerology theme variables

---

## Step 2: Clean Up timegnosis Project

### 2.1 Remove tarot from timegnosis

**Delete these directories:**
- `src/app/tarot/` (entire directory)
- `src/lib/crypto-random.ts`
- `src/lib/readings-config.json`

### 2.2 Update NavBar
- Remove `/tarot` link from navigation

### 2.3 Remove Google Analytics from layout.tsx
- Remove GA script from timegnosis (tarot keeps it)

---

## Step 3: Update Docker Configs

### 3.1 tarot-divinations/docker-compose.yml
```yaml
services:
  tarot-nextjs:
    image: pavlos888/tarot-nextjs:latest
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - app-network

  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --config /etc/cloudflared/config.yml run
    volumes:
      - ./cloudflared-config:/etc/cloudflared
    depends_on:
      - tarot-nextjs
    restart: unless-stopped
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### 3.2 tarot-divinations/deploy-to-pi.sh
Update image name to `pavlos888/tarot-nextjs:latest`

### 3.3 tarot-divinations/cloudflared-config/config.yml
```yaml
tunnel: <tunnel-id>
credentials-file: /etc/cloudflared/<tunnel-id>.json

ingress:
  - hostname: <TAROT_DOMAIN>
    service: http://tarot-nextjs:3000
  - service: http_status:404
```

---

## Step 4: Update package.json

### 4.1 tarot-divinations/package.json
- Change `name` to `tarot-divinations`
- Remove unused dependencies:
  - `draft-js`
  - `sanitize-html`
  - `@types/draft-js`
  - `@types/sanitize-html`
- Keep:
  - `next`, `react`, `react-dom`
  - `tailwindcss`, `@tailwindcss/postcss`
  - `typescript`
  - `framer-motion` (if used in tarot animations)

---

## Step 5: Git Setup

### 5.1 Initialize tarot-divinations as new repo
```bash
cd ../tarot-divinations
rm -rf .git
git init
git add .
git commit -m "Initial commit: Tarot Divinations app"
```

### 5.2 Create GitHub repo (manual or gh cli)
```bash
gh repo create tarot-divinations --private --source=.
git push -u origin main
```

---

## Files to Modify (in tarot-divinations)

| File | Change |
|------|--------|
| `package.json` | Update name, remove deps |
| `docker-compose.yml` | Update service name |
| `deploy-to-pi.sh` | Update image name |
| `next.config.ts` | Simplify (remove numerology caching) |
| `src/app/layout.tsx` | New root layout for tarot |
| `src/app/globals.css` | Tarot-only styles |
| All tarot imports | Update paths after restructure |

## Files to Modify (in timegnosis)

| File | Change |
|------|--------|
| `src/app/components/NavBar.tsx` | Remove tarot link |
| `src/app/layout.tsx` | Remove Google Analytics |

---

## Domains (TBD)
- timegnosis: `<MAIN_DOMAIN>`
- tarot: `<TAROT_DOMAIN>`

---

## Verification Checklist
- [ ] tarot-divinations builds: `npm run build`
- [ ] tarot-divinations runs locally: `npm run dev`
- [ ] timegnosis builds without tarot: `npm run build`
- [ ] Docker image builds: `docker build -t tarot-nextjs .`
- [ ] Routes work: `/`, `/reading`, `/guide`, `/chart`, `/significators`
