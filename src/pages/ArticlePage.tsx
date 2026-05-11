import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './ArticlePage.css'
import BlogArticle from '../components/BlogArticle'
import { blogArticles } from '../data/blogArticles'
import { getCanonicalUrl, CANONICAL_DOMAIN } from '../utils/seoHelpers'

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!slug) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Article not found</h2>
        <button onClick={() => navigate('/blog')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Back to Blog
        </button>
      </div>
    )
  }

  // Find article by slug
  const article = Object.values(blogArticles).find(
    (article) => article.slug === slug || article.id === slug
  )

  // Prepare metadata for the article
  const articleTitle = article?.title ? `${article.title} | South Road Trips` : 'Article | South Road Trips'
  const articleDescription = article?.metaDescription || article?.excerpt || 'Read our latest article on South Road Trips'
  const articleCanonical = getCanonicalUrl(`/blog/${slug}`)
  const articleImage = article?.ogImage || article?.image || `${CANONICAL_DOMAIN}/header-images/blog-og.jpg`
  const articleDate = article?.date || ''

  return (
    <>
      <Helmet>
        <title>{articleTitle}</title>
        <meta name="description" content={articleDescription} />
        {article?.keywords && <meta name="keywords" content={article.keywords.join(', ')} />}
        <link rel="canonical" href={articleCanonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={articleTitle} />
        <meta property="og:description" content={articleDescription} />
        <meta property="og:url" content={articleCanonical} />
        <meta property="og:image" content={articleImage} />
        
        {/* Article Specific Tags */}
        {articleDate && <meta property="article:published_time" content={articleDate} />}
        {article?.author && <meta property="article:author" content={article.author} />}
        
        {/* Twitter Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={articleTitle} />
        <meta property="twitter:description" content={articleDescription} />
        <meta property="twitter:image" content={articleImage} />
      </Helmet>
      
      <div className="article-page-container">
        <BlogArticle articleId={slug} />
      </div>
    </>
  )
}

export default ArticlePage
