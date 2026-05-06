import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ArticlePage.css'
import BlogArticle from '../components/BlogArticle'

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

  return (
    <div className="article-page-container">
      <BlogArticle articleId={slug} />
    </div>
  )
}

export default ArticlePage
