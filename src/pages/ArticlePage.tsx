import './ArticlePage.css';
import BlogArticle from '../components/BlogArticle';
import { useNavigation } from '../context/PageContext';

const ArticlePage = () => {
  const { articleId } = useNavigation();

  if (!articleId) {
    return null;
  }

  return (
    <div className="article-page-container">
      <BlogArticle articleId={articleId} />
    </div>
  );
};

export default ArticlePage;
