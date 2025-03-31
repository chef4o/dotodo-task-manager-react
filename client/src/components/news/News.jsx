import { useContext, useEffect } from "react";
import ArticleDetails from "./ArticleDetails";
import ArticleEditDetails from "./ArticleEditDetails";
import NavContext from "../../contexts/navContext";
import { getDataFromStorageOrServer } from "../../services/cacheService";

export default function News() {
  const { handleNavigationClick, setLoading, navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);
  const { page } = useParams();

  const initialNews = JSON.parse(sessionStorage.getItem("news")) || [];
  const [articles, setArticles] = useState(initialNews);
  const [activeArticleId, setActiveArticleId] = useState("");
  const [editArticleId, setEditArticleId] = useState("");
  const [makeNew, setMakeNew] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user?.id) {
      getDataFromStorageOrServer("news", () => getAllArticlesSorted("startDate", "desc"), setArticles);
    }
    setLoading(false);
  }, [user]);

  return (
    <div className="content news">
      {!activeArticleId && !editArticleId ? (
        <div>
          <form className="new-article-btn" th:action="@{'/news/new'}" th:method="get">
            <button type="submit">Create article</button>
          </form>
          <h3>Latest news and updates</h3>
          <ul className="articles" th:if="${articles != null && articles.size() > 0}">
                          {notes.map((item) =>
                            activeNoteId && activeNoteId === item.id ? (
                              <NoteItemDetails
                                key={item.id}
                                note={item}
                                setEditNoteId={setEditNoteId}
                                activeNoteId={activeNoteId}
                                setActiveNoteId={setActiveNoteId}
                                deleteNote={deleteNoteHandler}
                                setMakeNew={setMakeNew}
                                navigate={navigate}
                              />
                            ) : null
                          )}

            <li className="article" th:each="article: ${articles}">
              <th:block th:insert="~{fragments/news/news-details}"></th:block>
            </li>
          </ul>
          <div className="paging" th:if="${articles != null && articles.size() > 0}">
            <ul>
              <li className="selected">
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">NEXT</a>
              </li>
            </ul>
            <span>Page 1 of 2</span>
          </div>

          <div className="articles" th:if="${articles == null || articles.size() == 0}">
            <p>There are no articles yet.</p>
          </div>
        </div>
      ) : activeArticleId ? (
        <ArticleDetails />
      ) : (
        <ArticleEditDetails />
      )}
    </div>
  );
}
