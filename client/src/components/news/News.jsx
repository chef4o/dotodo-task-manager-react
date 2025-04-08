import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDataFromStorageOrServer } from "../../services/cacheService";
import { getAllNews } from "../../services/newsService";
import ArticleItem from "./ArticleItem";
import NavContext from "../../contexts/navContext.jsx";
import AuthContext from "../../contexts/authContext.jsx";

export default function News() {
  const { setLoading, navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const initialNews = JSON.parse(sessionStorage.getItem("news")) || [];
  const [articles, setArticles] = useState(initialNews);

  useEffect(() => {
    setLoading(true);
    getDataFromStorageOrServer("news", () => getAllNews("uploadDate", "desc"), setArticles);
    setLoading(false);
  }, [location.pathname]);

  return (
    <div className="content news">
      <div className="container">
        {user?.role >= 4 && (
          <button
            className="new-article-btn"
            onClick={() => {
              navigate(`/news/new`);
            }}>
            Create article
          </button>
        )}

        <h3>Latest news and updates</h3>

        {articles?.length > 0 ? (
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
        )}
      </div>
    </div>
  );
}
