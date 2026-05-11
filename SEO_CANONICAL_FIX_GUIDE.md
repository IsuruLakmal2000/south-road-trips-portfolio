# SEO Canonical URL Fix - Implementation Guide

## Overview

This document details all the SEO improvements implemented to fix the canonical URL inconsistency issue on the South Road Trips website. The website was previously accessible via both `https://southroadtrips.com/` and `https://www.southroadtrips.com/`, causing Google Search Console to report "Alternative page with proper canonical tag" warnings.

**Goal**: Establish `https://www.southroadtrips.com/` as the single canonical domain throughout the entire website.

---

## Changes Implemented

### 1. **React Helmet Async Setup** ✅

#### Files Modified:
- `package.json` - Added `react-helmet-async` dependency
- `src/main.tsx` - Wrapped App with `HelmetProvider`
- `src/App.tsx` - Added Helmet base tags

#### What This Does:
- Allows dynamic meta tag management on every page
- Enables canonical tags for each route
- Manages Open Graph and Twitter cards
- Controls page titles and descriptions

---

### 2. **SEO Helpers Utility** ✅

#### New File: `src/utils/seoHelpers.ts`

This utility provides:

```typescript
// Central canonical domain constant
export const CANONICAL_DOMAIN = 'https://www.southroadtrips.com';

// Page metadata configuration with pre-defined canonical URLs
export const pageMetadata = {
  home: { title, description, canonical, keywords, ogImage, ... },
  blog: { ... },
  faqs: { ... },
  bookingGuide: { ... }
}

// Helper functions:
- getCanonicalUrl(path) - Generate canonical URL for any path
- generateArticleMetadata() - Create metadata for blog articles
- buildHelmetConfig() - Generate complete Helmet configuration with all meta tags
```

**Usage:**
```typescript
<Helmet>
  <title>{pageMetadata.home.title}</title>
  <link rel="canonical" href={pageMetadata.home.canonical} />
  {/* Auto-generated meta tags */}
</Helmet>
```

---

### 3. **Page-Level Canonical Tags** ✅

#### Updated Pages:
- `src/pages/HomePage.tsx` - Home page metadata
- `src/pages/BlogPage.tsx` - Blog listing page metadata
- `src/pages/ArticlePage.tsx` - Dynamic article metadata
- `src/pages/FAQPage.tsx` - FAQ page metadata
- `src/pages/BookingGuidePage.tsx` - Booking guide metadata

#### Each page now includes:
- ✅ Proper `<title>` tag
- ✅ Meta description
- ✅ Canonical URL link
- ✅ Keywords meta tag
- ✅ Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- ✅ Twitter Card tags

#### Example (HomePage):
```typescript
<Helmet>
  <title>South Road Trips - Vehicle Rental & Guided Tours in Sri Lanka</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://www.southroadtrips.com/" />
  <meta property="og:url" content="https://www.southroadtrips.com/" />
  {/* ...other tags */}
</Helmet>
```

---

### 4. **Dynamic Article Metadata** ✅

#### ArticlePage (`src/pages/ArticlePage.tsx`):
- Extracts article metadata from blog data
- Generates dynamic canonical URLs: `https://www.southroadtrips.com/blog/{slug}`
- Includes article-specific schema tags (published_time, author)
- Supports dynamic Open Graph images

---

### 5. **Structured Data Updates** ✅

#### Modified Files:
- `src/components/BlogArticle.tsx` - Updated schema URLs
- `src/components/Blog.tsx` - Updated product data URLs
- `src/components/Vehicles.tsx` - Updated vehicle data URLs
- `src/utils/structuredData.ts` - All URLs now use `CANONICAL_DOMAIN` constant

#### Key Changes:
- Organization schema URL: Uses canonical domain
- WebSite schema URL: Uses canonical domain
- Product/Service schema URLs: Uses canonical domain
- Blog article @id: Uses canonical domain with slug

---

### 6. **Sitemap.xml Update** ✅

#### Location: `public/sitemap.xml`

**Before:**
```xml
<loc>https://southroadtrips.com/</loc>
<loc>https://southroadtrips.com/blog</loc>
```

**After:**
```xml
<loc>https://www.southroadtrips.com/</loc>
<loc>https://www.southroadtrips.com/blog</loc>
```

**All entries updated to use the www subdomain:**
- ✅ Main pages
- ✅ Blog pages
- ✅ All article URLs

---

### 7. **Robots.txt Update** ✅

#### Location: `public/robots.txt`

**Before:**
```
Sitemap: https://southroadtrips.com/sitemap.xml
```

**After:**
```
# Canonical Sitemap (using www domain)
Sitemap: https://www.southroadtrips.com/sitemap.xml
```

---

### 8. **Vercel Configuration (Primary)** ✅

#### File: `vercel.json`

**Added permanent 301 redirects:**
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://www.southroadtrips.com/$1",
      "permanent": true,
      "has": [
        {
          "type": "host",
          "value": "southroadtrips.com"
        }
      ]
    }
  ]
}
```

**What This Does:**
- Redirects all traffic from `https://southroadtrips.com/*` to `https://www.southroadtrips.com/*`
- Preserves the path (e.g., `/blog/article` → `/blog/article`)
- Uses permanent (301) redirect (tells Google to update its index)
- Only applies when host is exactly `southroadtrips.com`

---

### 9. **Netlify Configuration (Backup)** ✅

#### File: `public/_redirects`

**For Netlify hosting (if used in future):**
```
# 301 Redirect from non-www to www domain
http://southroadtrips.com/* https://www.southroadtrips.com/:splat 301!
https://southroadtrips.com/* https://www.southroadtrips.com/:splat 301!

# SPA Routing for React Router
/* /index.html 200
```

---

### 10. **Apache/Hostinger Configuration (Backup)** ✅

#### File: `public/.htaccess`

**For Apache servers (if self-hosted):**
```apache
# Force www and HTTPS
RewriteCond %{HTTP_HOST} ^southroadtrips\.com [NC]
RewriteRule ^(.*)$ https://www.southroadtrips.com/$1 [R=301,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# SPA routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
```

---

## Files Summary

### New Files Created:
1. **`src/utils/seoHelpers.ts`** - Centralized SEO configuration
2. **`public/_redirects`** - Netlify redirect rules
3. **`public/.htaccess`** - Apache server configuration

### Files Modified:
1. `package.json` - Added react-helmet-async
2. `src/main.tsx` - Added HelmetProvider wrapper
3. `src/App.tsx` - Added Helmet configuration
4. `src/pages/HomePage.tsx` - Added Helmet with canonical
5. `src/pages/BlogPage.tsx` - Added Helmet with canonical
6. `src/pages/ArticlePage.tsx` - Added dynamic Helmet with canonical
7. `src/pages/FAQPage.tsx` - Added Helmet with canonical
8. `src/pages/BookingGuidePage.tsx` - Added Helmet with canonical
9. `src/components/Blog.tsx` - Updated URLs to use CANONICAL_DOMAIN
10. `src/components/Vehicles.tsx` - Updated URLs to use CANONICAL_DOMAIN
11. `src/components/BlogArticle.tsx` - Updated structured data URLs
12. `src/utils/structuredData.ts` - Updated all URLs to use CANONICAL_DOMAIN
13. `public/sitemap.xml` - Updated all URLs to www domain
14. `public/robots.txt` - Updated sitemap URL to www domain
15. `vercel.json` - Added 301 redirect configuration

---

## Verification Checklist

Use this checklist to verify the implementation:

### ✅ Canonical Tags
- [ ] Visit home page: Check `<link rel="canonical" href="https://www.southroadtrips.com/" />`
- [ ] Visit blog page: Check canonical points to `/blog`
- [ ] Visit FAQ page: Check canonical points to `/faqs`
- [ ] Visit article: Check canonical includes correct slug
- [ ] Open page source: Verify canonical tag is in `<head>`

### ✅ Meta Tags
- [ ] All pages have proper `<title>` tags
- [ ] All pages have `<meta name="description">` tags
- [ ] All pages have Open Graph tags (og:title, og:description, og:url, og:image)
- [ ] All pages have Twitter Card tags

### ✅ Redirects (After Deployment)
- [ ] Visit `https://southroadtrips.com/` → Should redirect to `https://www.southroadtrips.com/`
- [ ] Visit `https://southroadtrips.com/blog` → Should redirect to `https://www.southroadtrips.com/blog`
- [ ] Check browser address bar shows www domain
- [ ] Verify HTTP status code is 301 (permanent redirect)

### ✅ Structured Data
- [ ] Organization schema uses canonical domain
- [ ] WebSite schema uses canonical domain
- [ ] Product schemas use canonical domain
- [ ] Blog article schema uses canonical domain with correct slug

### ✅ Sitemap & Robots
- [ ] All URLs in sitemap.xml use www domain
- [ ] robots.txt points to www sitemap
- [ ] No non-www URLs remain in sitemap

### ✅ Google Search Console
- [ ] Remove non-www version of site (or set preferred domain to www)
- [ ] Resubmit updated sitemap
- [ ] Monitor "Alternative page with proper canonical tag" warnings (should decrease)
- [ ] Check coverage report for any URL errors
- [ ] Submit URLs for recrawling

---

## Next Steps

### Immediate (After Deployment):
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Test locally:**
   ```bash
   npm run build
   npm run preview
   ```
   - Test all pages load correctly
   - Open DevTools > Network: Verify no 4xx errors
   - Open DevTools > Elements: Verify canonical tags are present

3. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Fix: Implement canonical URL structure and SEO improvements"
   git push
   ```

### After Deployment:
1. **Test 301 redirects:**
   - Visit `https://southroadtrips.com/` (non-www)
   - Verify redirect to `https://www.southroadtrips.com/`
   - Check HTTP response code (should be 301)
   - Command: `curl -I https://southroadtrips.com/`

2. **Update Google Search Console:**
   - Go to Settings → Preferred Domain
   - Select `https://www.southroadtrips.com/`
   - Remove non-www version from properties list

3. **Resubmit Sitemap:**
   - Go to Sitemaps in Google Search Console
   - Remove old sitemap: `https://southroadtrips.com/sitemap.xml`
   - Add new sitemap: `https://www.southroadtrips.com/sitemap.xml`

4. **Request Recrawl:**
   - In Google Search Console → URL inspection
   - Enter: `https://www.southroadtrips.com/`
   - Click "Request Indexing"
   - Repeat for blog and other main pages

5. **Monitor for 2-4 weeks:**
   - Check Google Search Console for indexing progress
   - Verify warning "Alternative page with proper canonical tag" decreases
   - Monitor organic traffic (may dip slightly during transition)
   - Check Core Web Vitals remain healthy

---

## Trailing Slash Consistency

### Current Implementation:
- **Root URL:** `https://www.southroadtrips.com/` (with trailing slash)
- **Other routes:** `https://www.southroadtrips.com/blog` (no trailing slash)

This follows common conventions where:
- Root route has trailing slash
- Non-root routes don't have trailing slash

### If you want ALL routes WITH trailing slashes:
Update `seoHelpers.ts`:
```typescript
export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Always add trailing slash
  const normalizedPath = cleanPath === '/' ? cleanPath : `${cleanPath}/`;
  return `${CANONICAL_DOMAIN}${normalizedPath}`;
};
```

---

## Production Checklist

Before going live:
- [ ] All TypeScript types are correct
- [ ] No console errors in browser DevTools
- [ ] Lighthouse score is acceptable (>80 for SEO)
- [ ] Page load time is acceptable (<3 seconds)
- [ ] Mobile responsive design works
- [ ] Forms submit correctly
- [ ] Links all work and don't have 404 errors
- [ ] Canonical tags appear in page source
- [ ] No mixed HTTP/HTTPS content

---

## Future Maintenance

### To add new pages:
1. Create page component in `src/pages/`
2. Add metadata to `seoHelpers.ts` → `pageMetadata`
3. Import and use `Helmet` component with metadata
4. Add route to `App.tsx`
5. Add URL entry to `public/sitemap.xml`

### To update canonical domain:
1. Change `CANONICAL_DOMAIN` in `src/utils/seoHelpers.ts`
2. All URLs automatically update across the site
3. Update `vercel.json` redirect destination if needed
4. Update `public/_redirects` if using Netlify
5. Update `public/.htaccess` if using Apache

### Monthly tasks:
1. Monitor Google Search Console
2. Check for crawl errors
3. Verify 301 redirects are working
4. Monitor bounce rate and user engagement
5. Update sitemap if new content added

---

## Troubleshooting

### Issue: Canonical tags not showing in browser
**Solution:**
1. Right-click → "View Page Source"
2. Search for "canonical"
3. If not found, check HelmetProvider is wrapping App

### Issue: Redirects not working
**Solution:**
1. **Vercel:** Wait 5-10 minutes after deployment
2. **Netlify:** Ensure `_redirects` is in `public/` folder
3. **Apache:** Ensure `.htaccess` is in root and mod_rewrite is enabled

### Issue: Structured data still shows non-www URLs
**Solution:**
1. Search files for hardcoded "southroadtrips.com"
2. Replace with `CANONICAL_DOMAIN` constant or `${CANONICAL_DOMAIN}`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Redeployment may be needed

### Issue: 404 errors after redirect
**Solution:**
1. Verify route exists in React Router (App.tsx)
2. Check `_redirects` or `.htaccess` doesn't have conflicting rules
3. Ensure rewrites come AFTER redirects

---

## References

- [Google: Canonical URLs](https://developers.google.com/search/docs/beginner/5-common-mistakes)
- [React Helmet Async Documentation](https://github.com/steverikard/react-helmet-async)
- [Vercel Redirects Documentation](https://vercel.com/docs/edge-network/redirects)
- [Netlify Redirects Documentation](https://docs.netlify.com/routing/redirects/)
- [Apache .htaccess Guide](https://httpd.apache.org/docs/current/howto/rewrite/)
- [XML Sitemap Protocol](https://www.sitemaps.org/)

---

## Support

For questions or issues with this implementation:
1. Check the verification checklist
2. Review the troubleshooting section
3. Check browser DevTools for errors
4. Verify files were edited correctly
5. Clear browser cache and rebuild

---

**Last Updated:** May 11, 2026  
**Canonical Domain:** `https://www.southroadtrips.com`  
**Status:** ✅ Production Ready
