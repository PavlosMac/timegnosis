# Deploying Multiple Applications from One Next.js Project

This document outlines approaches for deploying the tarot module as a separate service while maintaining a single codebase.

---

## Option 1: Next.js Multi-Zones

Deploy the same codebase twice with different entry points using `basePath` or domain routing.

```typescript
// next.config.ts for timegnosis main app
const config = {
  // Exclude tarot routes from main app build
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/tarot/:path*', destination: 'https://tarot.timegnosis.com/:path*' }
      ]
    }
  }
}

// next.config.ts for tarot app (separate build)
const config = {
  basePath: '', // tarot becomes root
  // Only include tarot routes
}
```

**Limitation:** Still requires two separate builds/deploys.

---

## Option 2: Turborepo Monorepo (Best for shared code)

Restructure into a monorepo with shared packages:

```
timegnosis/
├── apps/
│   ├── main/          # Main timegnosis app
│   │   └── src/app/
│   └── tarot/         # Tarot app
│       └── src/app/
├── packages/
│   └── shared/        # Shared lib (crypto-random, etc.)
├── turbo.json
└── package.json
```

**Pros:** Single repo, shared code, parallel builds
**Cons:** Requires restructuring

---

## Option 3: Environment-Based Build (Simplest)

Use a single codebase with build-time flags:

```typescript
// next.config.ts
const appMode = process.env.APP_MODE || 'main'

const config = {
  ...(appMode === 'tarot' && {
    // Tarot-specific config
    async redirects() {
      return [
        { source: '/', destination: '/tarot', permanent: false },
        // Redirect non-tarot routes to main domain
      ]
    }
  })
}
```

**docker-compose.yml:**
```yaml
services:
  timegnosis-next-app:
    image: pavlos888/timegnosis:latest
    environment:
      - APP_MODE=main

  tarot-app:
    image: pavlos888/timegnosis:latest  # Same image!
    environment:
      - APP_MODE=tarot
```

**Pros:** Single Docker image, minimal changes
**Cons:** Both apps include all code (larger bundle)

---

## Option 4: Middleware Domain Routing (Recommended)

Single deployment that routes based on hostname:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  if (hostname.includes('tarot.')) {
    // Rewrite tarot domain requests to /tarot routes
    const url = request.nextUrl.clone()
    if (!url.pathname.startsWith('/tarot')) {
      url.pathname = `/tarot${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}
```

**Pros:** Single deployment, single image, simplest infrastructure
**Cons:** Cannot independently scale apps

---

## Comparison Table

| Approach | Docker Images | Cloudflare Config | Code Changes |
|----------|--------------|-------------------|--------------|
| Option 1 (Multi-Zones) | 2 images | Add hostname route | Separate builds |
| Option 2 (Turborepo) | 2 images | Add hostname route | Major restructure |
| Option 3 (Env-based) | 1 image, 2 containers | Add hostname route | Add next.config logic |
| Option 4 (Middleware) | 1 image, 1 container | Add hostname route | Add middleware.ts |

---

## Cloudflare Tunnel Configuration

For any approach, update `cloudflared-config/config.yml`:

```yaml
tunnel: <your-tunnel-id>
credentials-file: /etc/cloudflared/<tunnel-id>.json

ingress:
  - hostname: timegnosis.com
    service: http://timegnosis-next-app:3000
  - hostname: tarot.timegnosis.com        # NEW ROUTE
    service: http://tarot-app:3000        # Or same service for Option 4
  - service: http_status:404
```

---

## Tarot Module Dependencies

The tarot module is well-isolated with minimal external dependencies:

**Files to consider (if extracting):** ~28 files
- 5 page routes (`/tarot`, `/tarot/reading`, `/tarot/significators`, `/tarot/guide`, `/tarot/chart`)
- 12 components
- 5 utilities
- 1 service
- 2 shared lib files (`crypto-random.ts`, `readings-config.json`)

**NPM dependencies needed:**
- `next`, `react`, `react-dom`
- `tailwindcss`, `@tailwindcss/postcss`
- `typescript`

**Not needed:** `draft-js`, `framer-motion`, `sanitize-html`

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| | | |

<!-- Update this table when a decision is made -->
