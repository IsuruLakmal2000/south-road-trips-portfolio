import { Helmet } from 'react-helmet-async'
import HeaderSlideshow from '../components/HeaderSlideshow'
import Features from '../components/Features'
import Vehicles from '../components/Vehicles'
import Tours from '../components/Tours'
import Blog from '../components/Blog'
import About from '../components/About'
import Contact from '../components/Contact'
import { pageMetadata } from '../utils/seoHelpers'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>{pageMetadata.home.title}</title>
        <meta name="description" content={pageMetadata.home.description} />
        <meta name="keywords" content={pageMetadata.home.keywords} />
        <link rel="canonical" href={pageMetadata.home.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content={pageMetadata.home.ogType} />
        <meta property="og:title" content={pageMetadata.home.title} />
        <meta property="og:description" content={pageMetadata.home.description} />
        <meta property="og:url" content={pageMetadata.home.canonical} />
        <meta property="og:image" content={pageMetadata.home.ogImage} />
        
        {/* Twitter Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageMetadata.home.title} />
        <meta property="twitter:description" content={pageMetadata.home.description} />
        <meta property="twitter:image" content={pageMetadata.home.ogImage} />
      </Helmet>
      
      <HeaderSlideshow />
      <Features />
      <Vehicles />
      <Tours />
      <Blog />
      <About />
      <Contact />
    </>
  )
}

export default HomePage
