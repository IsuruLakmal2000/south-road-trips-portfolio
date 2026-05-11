import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Blog from '../components/Blog'
import { pageMetadata } from '../utils/seoHelpers'

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>{pageMetadata.blog.title}</title>
        <meta name="description" content={pageMetadata.blog.description} />
        <meta name="keywords" content={pageMetadata.blog.keywords} />
        <link rel="canonical" href={pageMetadata.blog.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content={pageMetadata.blog.ogType} />
        <meta property="og:title" content={pageMetadata.blog.title} />
        <meta property="og:description" content={pageMetadata.blog.description} />
        <meta property="og:url" content={pageMetadata.blog.canonical} />
        <meta property="og:image" content={pageMetadata.blog.ogImage} />
        
        {/* Twitter Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageMetadata.blog.title} />
        <meta property="twitter:description" content={pageMetadata.blog.description} />
        <meta property="twitter:image" content={pageMetadata.blog.ogImage} />
      </Helmet>
      
      <Blog />
    </>
  )
}

export default BlogPage
