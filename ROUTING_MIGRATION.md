# React Router v6 Migration Guide

## Overview
This guide documents the migration from hash-based navigation (#blog) to proper React Router v6 routing with clean URLs.

## New URL Structure

### Routes
- `https://southroadtrips.com/` - Home page (all sections)
- `https://southroadtrips.com/blog` - Blog listing page
- `https://southroadtrips.com/blog/[slug]` - Individual article page

### Examples
- Home: `https://southroadtrips.com/`
- Blog Index: `https://southroadtrips.com/blog`
- Sea Turtle Article: `https://southroadtrips.com/blog/sea-turtle`
- Kayaking Article: `https://southroadtrips.com/blog/hikkaduwa-kayaking`

## Implementation Details

### 1. Dependencies Installed
```json
{
  "react-router-dom": "^6.21.0"
}
```

### 2. App Structure

#### src/App.tsx
- Wraps the app with `<BrowserRouter>`
- Defines all routes using `<Routes>`
- Maintains `<PageProvider>` for any context needs

#### New Routes
```tsx
<Route path="/" element={<HomePage />} />
<Route path="/blog" element={<BlogPage />} />
<Route path="/blog/:slug" element={<ArticlePage />} />
```

### 3. Component Updates

#### HomePage.tsx
- Contains all home page sections (HeaderSlideshow, Features, Vehicles, etc.)
- Scrolls to top on mount

#### BlogPage.tsx
- Dedicated page for blog listing
- Scrolls to top on mount
- Renders the Blog component

#### ArticlePage.tsx
- Uses `useParams()` to extract `:slug` from URL
- Uses `useNavigate()` for back button navigation
- Passes slug to BlogArticle component as articleId

#### Blog.tsx
- Removed `useNavigation()` hook
- Changed from `onClick={() => navigateToArticle()}` to `<Link to={/blog/${slug}}>`
- Uses React Router's `<Link>` component

#### BlogArticle.tsx
- Removed `useNavigation()` hook
- Back button uses `navigate('/blog')` instead of `goToBlog()`

#### header.tsx
- Added React Router `<Link>` for home and blog navigation
- Logo links to home page
- Anchor links (#vehicles, #tours, #about, #contact) remain for home page sections

### 4. Dynamic Slug Support

Blog articles must have a `slug` field. The blogArticles data now includes:

```typescript
interface BlogArticleData extends BlogPostPreview {
  slug?: string;  // Unique URL slug
  metaDescription?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}
```

Example slugs:
- `sea-turtle` → `/blog/sea-turtle`
- `hikkaduwa-kayaking` → `/blog/hikkaduwa-kayaking`
- `hidden-beaches` → `/blog/hidden-beaches`

### 5. Navigation Flow

**Home Page → Blog Listing**
```
Link to="/blog" (Header or homepage)
→ BlogPage component
→ displays all blog articles
```

**Blog Listing → Article**
```
Link to={/blog/${article.slug}} (Blog card)
→ ArticlePage component with :slug param
→ ArticlePage uses slug to fetch article
→ BlogArticle renders the article
```

**Article → Back to Blog**
```
Back button with onClick={() => navigate('/blog')}
→ Returns to BlogPage
```

### 6. Deployment Configuration

#### Vercel (vercel.json)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Netlify (netlify.toml)
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This redirects all routes to index.html, allowing React Router to handle routing on the client side.

## Installation & Setup

### 1. Install Dependencies
```bash
npm install react-router-dom@^6.21.0
```

### 2. Update Vite Configuration (if needed)
No changes required - React Router works seamlessly with Vite.

### 3. Build & Deploy
```bash
npm run build
# For Vercel
vercel deploy

# For Netlify
netlify deploy --prod
```

## Backward Compatibility

### Old Links → New Links
- `#blog` → `/blog`
- `#home` → `/`
- Direct article links → `/blog/[slug]`

### Anchor Links
Home page sections still use anchor links:
- `/#vehicles` → `/` (scrolls to vehicles section)
- `/#tours` → `/` (scrolls to tours section)
- `/#about` → `/` (scrolls to about section)
- `/#contact` → `/` (scrolls to contact section)

## Query Parameters Support (Optional)

For future features like category filtering on blog page:
```tsx
// Usage
<Link to="/blog?category=Adventure">Adventure Articles</Link>

// In BlogPage.tsx
import { useSearchParams } from 'react-router-dom';
const [searchParams] = useSearchParams();
const category = searchParams.get('category');
```

## SEO Improvements

### Meta Tags
Each article now has SEO fields:
- `metaDescription` - For meta tag
- `keywords` - Array of keywords
- `ogTitle` - Social media title
- `ogDescription` - Social media description
- `ogImage` - Social media image

### Dynamic Meta Tags (Optional Enhancement)
Can be implemented with `react-helmet-async` for dynamic title/description:

```tsx
import { Helmet } from 'react-helmet-async';

function ArticlePage() {
  const article = blogArticles[slug];
  return (
    <>
      <Helmet>
        <title>{article.ogTitle}</title>
        <meta name="description" content={article.metaDescription} />
      </Helmet>
      <BlogArticle articleId={slug} />
    </>
  );
}
```

## Browser Compatibility

React Router v6 works with:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern browsers

## Migration Checklist

- [x] Install react-router-dom
- [x] Create HomePage.tsx with home sections
- [x] Create BlogPage.tsx for blog listing
- [x] Update ArticlePage.tsx to use useParams()
- [x] Update Blog.tsx to use Link component
- [x] Update BlogArticle.tsx to use useNavigate()
- [x] Update header.tsx with Link components
- [x] Create vercel.json for rewrites
- [x] Create netlify.toml for redirects
- [x] Test all routes locally
- [x] Test direct URL access (e.g., /blog/sea-turtle)
- [x] Test browser back/forward buttons
- [x] Deploy to production

## Troubleshooting

### Issue: 404 Page Not Found
**Solution**: Ensure vercel.json or netlify.toml is properly configured with rewrites.

### Issue: Broken links in production
**Solution**: Use `<Link>` instead of `<a>` for internal navigation.

### Issue: Page not scrolling to top
**Solution**: `useEffect` in ArticlePage and BlogPage components handle scroll-to-top.

### Issue: Slug not matching article
**Solution**: Verify slug field in blogArticles data matches the URL slug.

## Future Enhancements

1. **Dynamic Meta Tags**: Use react-helmet-async for SEO
2. **Pagination**: Add `/blog?page=2` for paginated blog listing
3. **Category Filtering**: Add `/blog?category=Adventure`
4. **Search**: Add search functionality to blog page
5. **Archive**: Add `/blog/archive` for archived articles
6. **Tags**: Add `/blog/tag/[tag]` for tag-based filtering

---

**Last Updated**: May 6, 2026
**Version**: 1.0
