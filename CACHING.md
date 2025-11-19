# Caching Strategy

## Overview

This application uses a multi-layer caching strategy:

1. **Browser Cache** - Client-side caching via Cache-Control headers
2. **Cloudflare Edge Cache** - CDN caching at Cloudflare's edge
3. **Next.js Image Optimization** - Optimized and cached images
4. **Static Asset Immutability** - Versioned assets cached forever

## Cache Layers

### 1. Static Assets (1 year cache)

**What:** JS, CSS, fonts, images, SVGs
**Cache-Control:** `public, max-age=31536000, immutable`
**Why:** These files are versioned by Next.js build hash, so they never change

Cached paths:
- `/_next/static/*` - Next.js build assets
- `/_next/image/*` - Optimized images
- `/planets/*` - Planet SVG icons
- `/blog/*` - Blog images
- All image formats: `.svg`, `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`
- All font formats: `.woff`, `.woff2`, `.ttf`, `.otf`

### 2. HTML Pages (1 hour cache + stale-while-revalidate)

**What:** All HTML pages
**Cache-Control:** `public, max-age=3600, stale-while-revalidate=86400`
**Why:** 
- Cached for 1 hour for fast loading
- Can serve stale content for 24 hours while revalidating in background
- Good balance between freshness and performance

### 3. Next.js Image Optimization

**Configuration:**
- Formats: AVIF (best compression) → WebP (fallback) → Original
- Minimum cache TTL: 1 year
- Responsive sizes: 640px to 3840px

**Benefits:**
- Automatic format conversion
- Responsive image serving
- Lazy loading by default
- Optimized file sizes

## Cloudflare Configuration

### Current Setup

Cloudflare Tunnel respects the Cache-Control headers sent by Next.js.

### Additional Cloudflare Optimizations (Optional)

To enable Cloudflare's edge caching, add these Page Rules in your Cloudflare dashboard:

1. **Cache Everything for Static Assets**
   - URL: `gnosisesoterica.com/_next/static/*`
   - Setting: Cache Level = Cache Everything
   - Edge Cache TTL: 1 year

2. **Cache Everything for Images**
   - URL: `gnosisesoterica.com/_next/image/*`
   - Setting: Cache Level = Cache Everything
   - Edge Cache TTL: 1 year

3. **Cache Everything for Public Assets**
   - URL: `gnosisesoterica.com/planets/*`
   - Setting: Cache Level = Cache Everything
   - Edge Cache TTL: 1 year

4. **Polish Images** (Cloudflare Pro+)
   - Automatic image optimization at the edge
   - Lossless or lossy compression

5. **Mirage** (Cloudflare Pro+)
   - Lazy loading for images
   - Automatic image resizing

## Performance Impact

### Before Caching:
- Every request hits your Pi
- Images loaded at full size
- No browser caching
- Slow repeat visits

### After Caching:
- Static assets: Served from browser cache (0ms)
- Images: Optimized format + size, cached for 1 year
- HTML: Cached for 1 hour, stale-while-revalidate for 24h
- Cloudflare edge: Serves cached content globally

### Expected Improvements:
- **First visit:** 20-30% faster (image optimization)
- **Repeat visits:** 80-90% faster (browser cache)
- **Global users:** 50-70% faster (Cloudflare edge cache)
- **Pi load:** Reduced by 70-80%

## Verifying Cache Headers

### Check in Browser DevTools:

1. Open DevTools → Network tab
2. Load your site
3. Click on any asset
4. Check Response Headers for `Cache-Control`

### Expected Headers:

**Static assets:**
```
Cache-Control: public, max-age=31536000, immutable
```

**HTML pages:**
```
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

**Cloudflare headers:**
```
CF-Cache-Status: HIT  (cached at edge)
CF-Cache-Status: MISS (not cached yet)
CF-Cache-Status: DYNAMIC (not cacheable)
```

## Cache Invalidation

### When to Invalidate:

**Never needed for:**
- Static assets (versioned by build hash)
- Images (immutable URLs)

**Needed for:**
- HTML pages (if you want immediate updates)

### How to Invalidate:

1. **Cloudflare Dashboard:**
   - Caching → Configuration → Purge Cache
   - Purge Everything or Purge by URL

2. **Automatic:**
   - Deploy new version → new build hashes → new URLs
   - Old cached assets become unused

## Best Practices

1. ✅ **Use Next.js Image component** - Automatic optimization
2. ✅ **Don't bypass cache** - Let headers do their job
3. ✅ **Monitor cache hit rates** - Check Cloudflare Analytics
4. ✅ **Use immutable assets** - Never change file content, change filename instead
5. ✅ **Test cache headers** - Verify in DevTools before deploying

## Troubleshooting

### Images not caching?
- Check if using Next.js `<Image>` component
- Verify `/_next/image/*` in Network tab
- Check response headers

### Static assets not caching?
- Verify build hash in filename
- Check `/_next/static/*` paths
- Clear browser cache and test

### Cloudflare not caching?
- Check CF-Cache-Status header
- Verify Page Rules are active
- Check if URL matches rules

### Stale content showing?
- This is expected with stale-while-revalidate
- Purge Cloudflare cache if urgent
- Wait for max-age to expire (1 hour for HTML)
