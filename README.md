# TimeGnosis

A Next.js app for numerology calculations and tarot readings.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Deployment

See [DOCKER.md](./DOCKER.md) for Raspberry Pi deployment.

## Architecture

```
[ Browser ]
    |
    v
[ Cloudflare ] --> [ cloudflared tunnel ]
                          |
                    (app-network)
                          |
                          v
                   [ timegnosis-next-app ]
                     (port 3000)
```

The app runs in Docker on a Raspberry Pi, accessed via Cloudflare Tunnel. No ports exposed on the router.

## Caching

See [CACHING.md](./CACHING.md) for caching strategy details.


## Project-memory
https://github.com/SpillwaveSolutions/project-memory
See [SKILL.md](./SKILL.md) for project-memory details.

## Ctags + Hooks

Use ctags to generate a markdown index of your code structure (files/classes/methods)
Inject this automatically on Pre/PostToolUse hooks
Reduces hallucination by keeping the LLM aware of existing code