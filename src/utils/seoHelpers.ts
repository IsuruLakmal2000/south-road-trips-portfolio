/**
 * SEO Helper Functions and Constants
 * Centralized canonical URL and metadata management
 */

// Canonical domain - DO NOT CHANGE
export const CANONICAL_DOMAIN = 'https://www.southroadtrips.com';

/**
 * Page metadata configuration with canonical URLs
 */
export const pageMetadata = {
  home: {
    title: 'South Road Trips - Vehicle Rental & Guided Tours in Sri Lanka',
    description: 'Explore Sri Lanka with South Road Trips. Rent vehicles or join guided tours across beautiful destinations. Professional service, competitive rates.',
    canonical: `${CANONICAL_DOMAIN}/`,
    keywords: 'vehicle rental Sri Lanka, car rental Sri Lanka, guided tours Sri Lanka, motorcycle rental, van rental, Sri Lanka travel',
    ogType: 'website',
    ogImage: `${CANONICAL_DOMAIN}/header-images/home-og.jpg`,
  },
  blog: {
    title: 'Travel Blog | South Road Trips - Stories from Sri Lanka',
    description: 'Read travel stories, tips, and guides about exploring Sri Lanka. Discover hidden gems, wildlife, beaches, and adventure experiences.',
    canonical: `${CANONICAL_DOMAIN}/blog`,
    keywords: 'Sri Lanka travel blog, travel guides, adventure stories, wildlife conservation, beach destinations',
    ogType: 'website',
    ogImage: `${CANONICAL_DOMAIN}/header-images/blog-og.jpg`,
  },
  faqs: {
    title: 'FAQs | South Road Trips - Booking & Travel Questions',
    description: 'Find answers to frequently asked questions about booking vehicles, tours, pricing, and travel information for Sri Lanka.',
    canonical: `${CANONICAL_DOMAIN}/faqs`,
    keywords: 'FAQ, booking guide, vehicle rental help, travel questions, customer support',
    ogType: 'website',
    ogImage: `${CANONICAL_DOMAIN}/header-images/faqs-og.jpg`,
  },
  bookingGuide: {
    title: 'Booking Guide | South Road Trips - How to Book Your Adventure',
    description: 'Step-by-step guide on how to book vehicles and tours with South Road Trips. Easy, secure, and reliable booking process.',
    canonical: `${CANONICAL_DOMAIN}/booking-guide`,
    keywords: 'how to book, booking process, vehicle reservation, tour booking, Sri Lanka travel planning',
    ogType: 'website',
    ogImage: `${CANONICAL_DOMAIN}/header-images/booking-og.jpg`,
  },
};

/**
 * Generate canonical URL for a specific path
 */
export const getCanonicalUrl = (path: string): string => {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash for consistency (except for root)
  const normalizedPath = cleanPath === '/' ? cleanPath : cleanPath.replace(/\/$/, '');
  return `${CANONICAL_DOMAIN}${normalizedPath}`;
};

/**
 * Generate article/blog post metadata with canonical URL
 */
export const generateArticleMetadata = (
  articleSlug: string,
  title: string,
  description: string,
  publishedDate?: string,
  ogImage?: string
) => {
  return {
    title: `${title} | South Road Trips`,
    description,
    canonical: getCanonicalUrl(`/blog/${articleSlug}`),
    keywords: 'Sri Lanka, travel, blog, adventure',
    ogType: 'article',
    ogImage: ogImage || `${CANONICAL_DOMAIN}/header-images/blog-og.jpg`,
    published: publishedDate,
  };
};

/**
 * Generate complete Helmet head object for React
 */
export interface HelmetConfig {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  published?: string;
  author?: string;
}

export const buildHelmetConfig = (config: HelmetConfig) => {
  return {
    title: config.title,
    meta: [
      {
        name: 'description',
        content: config.description,
      },
      {
        name: 'keywords',
        content: config.keywords || 'South Road Trips, vehicle rental, Sri Lanka, tours',
      },
      {
        property: 'og:type',
        content: config.ogType || 'website',
      },
      {
        property: 'og:title',
        content: config.title,
      },
      {
        property: 'og:description',
        content: config.description,
      },
      {
        property: 'og:url',
        content: config.canonical,
      },
      ...(config.ogImage
        ? [
            {
              property: 'og:image',
              content: config.ogImage,
            },
          ]
        : []),
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'twitter:title',
        content: config.title,
      },
      {
        property: 'twitter:description',
        content: config.description,
      },
      ...(config.ogImage
        ? [
            {
              property: 'twitter:image',
              content: config.ogImage,
            },
          ]
        : []),
      ...(config.published
        ? [
            {
              property: 'article:published_time',
              content: config.published,
            },
          ]
        : []),
      ...(config.author
        ? [
            {
              property: 'article:author',
              content: config.author,
            },
          ]
        : []),
    ],
    link: [
      {
        rel: 'canonical',
        href: config.canonical,
      },
    ],
  };
};
