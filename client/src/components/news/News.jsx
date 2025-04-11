import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDataFromStorageOrServer } from "../../services/cacheService";
import { getAllNews } from "../../services/newsService";
import ArticleItem from "./ArticleItem";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";

export default function News() {
  const { setLoading, navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const location = useLocation();
  
  const [articles, setArticles] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        await getDataFromStorageOrServer(
          "news",
          async () => {
            const data = await getAllNews("uploadDate", "desc");
            return Array.isArray(data) ? data : [];
          },
          setArticles
        );
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setFetchComplete(true);
        setLoading(false);
      }
    }
    fetchNews();
  }, [location.pathname, user, setLoading]);

  return (
    <div className="content news">
      <div className="container">
        {user?.role >= 4 && (
          <button
            className="new-article-btn"
            onClick={() => navigate(`/news/new`)}
          >
            Create article
          </button>
        )}

        <h3>Latest news and updates</h3>

        {fetchComplete ? (
          articles.length > 0 ? (
            <ul className="articles">
              {articles
                .filter((item) => !item.archived)
                .map((item) => (
                  <ArticleItem key={item.id} article={item} />
                ))}
            </ul>
          ) : (
            <div className="articles">
              <p>There are no articles yet.</p>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
