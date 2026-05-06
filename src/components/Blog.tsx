import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import { blogPostPreviews } from '../data/blogArticles';

const Blog = () => {
  const [filteredPosts, setFilteredPosts] = useState(blogPostPreviews);
  const [activeFilter, setActiveFilter] = useState('All');

  // Get unique categories from blog posts
  const categories = ['All', ...new Set(blogPostPreviews.map(post => post.category))];

  // Handle filter changes
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredPosts(blogPostPreviews);
    } else {
      setFilteredPosts(blogPostPreviews.filter(post => post.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">Travel Stories & Tips</h2>
          <p className="blog-subtitle">
            Explore insider guides, photography tips, and authentic travel stories from our road trips across Sri Lanka
          </p>
        </div>

        <div className="blog-filters">
          {categories.map((category) => (
            <button 
              key={category} 
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image-wrapper">
                <img src={post.image} alt={post.title} className="blog-image" />
                <div className="blog-category-badge">{post.category}</div>
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>

                <h3 className="blog-post-title">{post.title}</h3>

                <p className="blog-excerpt">{post.excerpt}</p>

                <div className="blog-footer">
                  <span className="blog-author">By {post.author}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="read-more-btn"
                  >
                    Read More
                    <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-articles-message">
            <p>No articles found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
