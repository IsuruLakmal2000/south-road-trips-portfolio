import './ArticlePage.css';
import BlogArticle from '../components/BlogArticle';
import { useNavigation } from '../context/PageContext';

const ArticlePage = () => {
  const { articleId, goHome } = useNavigation();

  if (!articleId) {
    return null;
  }

  return (
    <div className="article-page-container">
      <BlogArticle articleId={articleId} />
      <div className="article-page-navigation">
        
      </div>
    </div>
  );
};

export default ArticlePage;
