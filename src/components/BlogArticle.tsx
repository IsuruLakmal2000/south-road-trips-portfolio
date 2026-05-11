import { useEffect } from 'react';
import './BlogArticle.css';
import { useNavigate } from 'react-router-dom';
import { blogArticles } from '../data/blogArticles';
import type { BlogArticleData, BlogArticleContent } from '../data/blogArticles';
import { injectStructuredData, removeStructuredData } from '../utils/structuredData';
import { CANONICAL_DOMAIN } from '../utils/seoHelpers';

interface BlogArticleProps {
  articleId?: string;
}

const BlogArticle = ({ articleId = 'sea-turtle' }: BlogArticleProps) => {
  const navigate = useNavigate();
  const article = blogArticles[articleId] as BlogArticleData | undefined;

  // Inject Article schema for blog posts
  useEffect(() => {
    if (article) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.metaDescription || article.excerpt,
        image: article.image || article.ogImage,
        datePublished: article.date,
        author: {
          '@type': 'Organization',
          name: article.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'South Road Trips',
          logo: {
            '@type': 'ImageObject',
            url: `${CANONICAL_DOMAIN}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${CANONICAL_DOMAIN}/blog/${article.slug || articleId}`,
        },
      };

      injectStructuredData(articleSchema, `article-schema-${articleId}`);

      return () => {
        removeStructuredData(`article-schema-${articleId}`);
      };
    }
  }, [article, articleId]);

  if (!article) {
    return <div className="article-not-found">Article not found</div>;
  }

  return (
    <section className="blog-article-section">
      <div className="article-container">
        {/* Hero Image */}
        <div className="article-hero">
          <img src={article.image} alt={article.title} className="article-hero-image" />
          <div className="article-hero-overlay">
            <div className="article-hero-content">
              <span className="article-category-badge">{article.category}</span>
              <h1 className="article-title">{article.title}</h1>
              <div className="article-meta-info">
                <span className="article-author">By {article.author}</span>
                <span className="article-separator">•</span>
                <span className="article-date">{article.date}</span>
                <span className="article-separator">•</span>
                <span className="article-read-time">{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="article-content">
          {article.content.map((block: BlogArticleContent, index: number) => {
            if (block.type === 'intro') {
              return (
                <p key={index} className="article-intro">
                  {block.text}
                </p>
              );
            }

            if (block.type === 'section') {
              return (
                <div key={index} className="article-section">
                  <h2 className="article-section-title">{block.title}</h2>
                  <p className="article-section-content">
                    {block.content?.split('\n').map((line: string, i: number) => (
                      <span key={i}>
                        {line}
                        {i < block.content!.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              );
            }

            if (block.type === 'list') {
              return (
                <div key={index} className="article-list-block">
                  <ul className="article-list">
                    {(block.items as string[]).map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  {block.endText && <p className="article-list-end-text">{block.endText}</p>}
                </div>
              );
            }

            if (block.type === 'highlight-list') {
              return (
                <div key={index} className="article-highlight-block">
                  <div className="highlight-items">
                    {(block.items as Array<{ title: string; desc: string }>).map((item: any, i: number) => (
                      <div key={i} className="highlight-item">
                        <h3 className="highlight-title">{item.title}</h3>
                        <p className="highlight-desc">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  {block.endText && <p className="article-highlight-end-text">{block.endText}</p>}
                </div>
              );
            }

            if (block.type === 'video' && block.src) {
              return (
                <div key={index} className="article-video-block">
                  <video controls className="article-video" poster={article.image}>
                    <source src={block.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            }

            if (block.type === 'cta') {
              return (
                <div key={index} className="article-cta-block">
                  <div className="cta-card">
                    <h3>Ready for Your Adventure?</h3>
                    <p>Inquire more about tours and rental options</p>
                    <a
                      href="https://wa.me/94764549169?text=Hi%20South%20Road%20Trips!%20I'd%20like%20to%20inquire%20about%20tours%20and%20rental%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-cta-button"
                    >
                      Inquire Now
                      <svg className="cta-arrow" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>

                  
                </div>
              );
            }

            return null;
          })}
        </article>

        {/* Back Button */}
        <div className="article-footer">
          <button type="button" onClick={() => navigate('/blog')} className="back-to-blog-btn">
            <svg className="back-arrow" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogArticle;

