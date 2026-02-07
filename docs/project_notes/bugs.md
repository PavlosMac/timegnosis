# Bug Log

This file logs bugs encountered in TimeGnosis and their solutions for future reference.

## Format

Each bug entry should include:
- Date (YYYY-MM-DD)
- Brief description of the bug/issue
- Solution or fix applied
- Any prevention notes (optional)

Use bullet lists for simplicity. Older entries can be manually removed when they become irrelevant.

---

## Entries

<!-- Add new bug entries below this line -->

- **2026-02-06**: Missing gnosis data for energy 5, mode "year"
  - **Cause**: gnosis-seed.json was missing the "Five Year" entry (id 34, energy 5, mode year)
  - **Solution**: Added the missing entry to gnosis-seed.json
  - **Prevention**: When adding new numerology content, ensure all three modes (day, month, year) are included for each energy number

- **2026-02-06**: "Failed to find Server Action 'x'" errors in production
  - **Cause**: Previous deployment used `'use server'` directive in `src/app/month/[id]/page.tsx` which was later removed in favor of `export const dynamic = "force-static"`. Aggressive caching (1-year immutable) in next.config.ts keeps old client JavaScript alive in browsers that reference non-existent server action IDs.
  - **Solution**: This is a cache timing issue. Users with stale cached JavaScript will see these errors until their browser cache expires or is cleared. Deploying a new build will not immediately fix for users with cached old bundles.
  - **Prevention**:
    - Consider shorter cache TTLs or versioned deployments when removing server actions
    - Clear CDN cache when making breaking changes to server actions
    - Users experiencing this should clear their browser cache
