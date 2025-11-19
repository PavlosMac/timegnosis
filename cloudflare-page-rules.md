# Cloudflare Page Rules for Optimal Caching

These Page Rules will enable Cloudflare's edge caching for your static assets.

## Setup Instructions

1. Go to your Cloudflare Dashboard
2. Select your domain: `gnosisesoterica.com`
3. Navigate to **Rules** → **Page Rules**
4. Add the following rules (in this order):

---

## Rule 1: Cache Next.js Static Assets

**URL Pattern:**
```
gnosisesoterica.com/_next/static/*
```

**Settings:**
- **Cache Level:** Cache Everything
- **Edge Cache TTL:** 1 year
- **Browser Cache TTL:** Respect Existing Headers

**Why:** Next.js build assets are versioned and immutable

---

## Rule 2: Cache Optimized Images

**URL Pattern:**
```
gnosisesoterica.com/_next/image/*
```

**Settings:**
- **Cache Level:** Cache Everything
- **Edge Cache TTL:** 1 year
- **Browser Cache TTL:** Respect Existing Headers

**Why:** Next.js optimized images are immutable

---

## Rule 3: Cache Planet Icons

**URL Pattern:**
```
gnosisesoterica.com/planets/*
```

**Settings:**
- **Cache Level:** Cache Everything
- **Edge Cache TTL:** 1 year
- **Browser Cache TTL:** Respect Existing Headers

**Why:** SVG icons don't change

---

## Rule 4: Cache Blog Images

**URL Pattern:**
```
gnosisesoterica.com/blog/*
```

**Settings:**
- **Cache Level:** Cache Everything
- **Edge Cache TTL:** 1 year
- **Browser Cache TTL:** Respect Existing Headers

**Why:** Blog images are static content

---

## Rule 5: Cache HTML with Revalidation

**URL Pattern:**
```
gnosisesoterica.com/*
```

**Settings:**
- **Cache Level:** Cache Everything
- **Edge Cache TTL:** 1 hour
- **Browser Cache TTL:** Respect Existing Headers

**Why:** HTML pages cached but revalidated frequently

---

## Additional Optimizations (Optional)

### Auto Minify

Go to **Speed** → **Optimization** → **Auto Minify**

Enable:
- ✅ JavaScript
- ✅ CSS
- ✅ HTML

### Brotli Compression

Go to **Speed** → **Optimization** → **Brotli**

Enable: ✅ Brotli

### Early Hints

Go to **Speed** → **Optimization** → **Early Hints**

Enable: ✅ Early Hints

### Rocket Loader (Optional - Test First)

Go to **Speed** → **Optimization** → **Rocket Loader**

⚠️ Test before enabling - may conflict with React hydration

---

## Cloudflare Pro Features (If Available)

### Polish (Image Optimization)

Go to **Speed** → **Optimization** → **Polish**

Settings:
- **Compression:** Lossless or Lossy
- **WebP:** Enabled

### Mirage (Lazy Loading)

Go to **Speed** → **Optimization** → **Mirage**

Enable: ✅ Mirage

### Argo Smart Routing

Go to **Traffic** → **Argo Smart Routing**

Enable: ✅ Argo (speeds up dynamic content)

---

## Verification

After setting up Page Rules:

1. Clear Cloudflare cache: **Caching** → **Configuration** → **Purge Everything**
2. Visit your site
3. Check DevTools → Network → Response Headers
4. Look for: `CF-Cache-Status: HIT`

## Free Plan Limits

- **Page Rules:** 3 rules (prioritize Rules 1, 2, and 5)
- **Cache Everything:** Works on Free plan
- **Polish/Mirage:** Pro plan only

## Recommended Priority (Free Plan)

If you only have 3 Page Rules available:

1. `/_next/static/*` - Most important (versioned assets)
2. `/_next/image/*` - Second most important (images)
3. `/*` - HTML caching

You can skip `/planets/*` and `/blog/*` as they'll still be cached via the `/*` rule, just not as aggressively.
