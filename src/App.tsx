import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from './components/header'
import Footer from './components/Footer'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import FAQPage from './pages/FAQPage'
import BookingGuidePage from './pages/BookingGuidePage'
import { PageProvider } from './context/PageContext'
import { CANONICAL_DOMAIN } from './utils/seoHelpers'
import './App.css'

// Inject Organization and WebSite structured data
const injectMainStructuredData = () => {
  // Organization Schema - Using canonical domain
  const organizationSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Organization',
    name: 'South Road Trips',
    url: `${CANONICAL_DOMAIN}`,
    logo: `${CANONICAL_DOMAIN}/logo.png`,
    description: 'Vehicle rental and guided tour services across Sri Lanka',
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
    serviceType: ['Vehicle Rental', 'Tour Services'],
  };

  // WebSite Schema with SearchAction - Using canonical domain
  const websiteSchema = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'South Road Trips',
    url: `${CANONICAL_DOMAIN}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${CANONICAL_DOMAIN}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Inject both schemas
  const orgScript = document.createElement('script');
  orgScript.type = 'application/ld+json';
  orgScript.id = 'org-schema';
  orgScript.textContent = JSON.stringify(organizationSchema);
  document.head.appendChild(orgScript);

  const webScript = document.createElement('script');
  webScript.type = 'application/ld+json';
  webScript.id = 'website-schema';
  webScript.textContent = JSON.stringify(websiteSchema);
  document.head.appendChild(webScript);
};

function AppLayout() {
  useEffect(() => {
    injectMainStructuredData();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/booking-guide" element={<BookingGuidePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Router>
        <PageProvider>
          <AppLayout />
        </PageProvider>
      </Router>
    </>
  )
}

export default App
