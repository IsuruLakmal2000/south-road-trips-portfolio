/**
 * Utility functions for generating JSON-LD structured data
 * Helps with SEO and Google Search Console structured data validation
 */

import { CANONICAL_DOMAIN } from './seoHelpers';

export interface OfferData {
  priceCurrency: string;
  price: string;
  availability?: string;
  url?: string;
}

export interface ProductStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  image?: string;
  url?: string;
  offers?: OfferData | OfferData[];
  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    ratingCount: number;
  };
}

/**
 * Generate Product structured data for rental vehicles
 */
export const generateVehicleProductData = (
  name: string,
  description: string,
  image?: string,
  url?: string,
  price?: string
): ProductStructuredData => {
  const data: ProductStructuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name,
    description,
  };

  if (image) data.image = image;
  if (url) data.url = url;

  // Add offer information (required to fix the structured data issue)
  data.offers = {
    '@type': 'Offer',
    priceCurrency: 'LKR',
    price: price || 'Contact for pricing',
    availability: 'https://schema.org/InStock',
    url: url || CANONICAL_DOMAIN,
  };

  return data;
};

/**
 * Generate Service structured data for tour/activity services
 */
export const generateServiceData = (
  name: string,
  description: string,
  image?: string,
  price?: string
) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Service',
    name,
    description,
    ...(image && { image }),
    ...(price && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'LKR',
        price,
      },
    }),
    areaServed: 'LK',
    serviceType: 'Vehicle Rental',
    provider: {
      '@type': 'LocalBusiness',
      name: 'South Road Trips',
      url: CANONICAL_DOMAIN,
    },
  };
};

/**
 * Generate Organization structured data
 */
export const generateOrganizationData = () => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Organization',
    name: 'South Road Trips',
    url: CANONICAL_DOMAIN,
    logo: `${CANONICAL_DOMAIN}/logo.png`,
    description: 'Vehicle rental and tour services in Sri Lanka',
    sameAs: [
      'https://www.facebook.com/southroadtrips',
      'https://www.instagram.com/southroadtrips',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+94-76-454-9169',
    },
    areaServed: 'LK',
  };
};

/**
 * Inject JSON-LD script into the document head
 */
export const injectStructuredData = (data: object, id?: string) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  if (id) script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * Remove previously injected structured data script
 */
export const removeStructuredData = (id: string) => {
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
};
