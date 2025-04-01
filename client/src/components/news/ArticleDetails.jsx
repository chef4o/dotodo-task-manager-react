import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import NavContext from "../../contexts/navContext";
import { editArticle, getAllNews, getArticleById } from "../../services/newsService";
import { formatToDateTime, processData } from "../../util/dataUtils";
import ArticleComment from "./ArticleComment";
import { initialState } from "../../util/validation/commonValidation";

export default function ArticleDetails() {
  const { setLoading, navigate } = useContext(NavContext);

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const [formValues, setFormValues] = useState(() => initialState({ text: "" }));

  const archiveArticle = async () => {
    if (!(user?.role >= 4)) return;
    setLoading(true);
    await editArticle(id, { archived: true });
    sessionStorage.removeItem("news");
    navigate("/news");
    setLoading(false);
  };

  const addComment = async (event) => {
    event.preventDefault();

    setLoading(true);

    const newComment = {
      text: formValues.text,
      author: user?.username || "Guest",
      createdAt: Date.now(),
    };

    await editArticle(id, { comments: [...article.comments, newComment] });
    const updatedArticle = await getArticleById(id);
    setArticle(updatedArticle);

    sessionStorage.removeItem("news");
    sessionStorage.setItem("news", () => getAllNews("uploadDate", "desc"));

    setFormValues({ text: "" });
    setNewComment(false);
    setLoading(false);
  };

  const likeArticle = async (id) => {
    await editArticle(id, { likes: Number(article?.likes) + 1 || Number(1) });
    sessionStorage.removeItem("news");
    const news = await getAllNews("uploadDate", "desc");
    sessionStorage.setItem("news", JSON.stringify(news));
    setArticle(await getArticleById(id));
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    const newValues = { ...formValues, [name]: value };
    setFormValues(newValues);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (id) {
        const fetchedArticle = await getArticleById(id);
        setArticle(fetchedArticle);
      }
      setLoading(false);
    }
    fetchData();
  }, [id, setLoading]);

  return (
    <div className="content news">
      <div className="article-details">
        {user?.role >= 4 && (
          <button className="archive-btn" onClick={() => archiveArticle(article?.id)}>
            Archive
          </button>
        )}
        <h3 className="article-title">{article?.title}</h3>
        <div className="posted-on">
          Posted on {article?.uploadDate ? formatToDateTime(article.uploadDate) : "Loading..."}
        </div>
        <p className="article-content">{article?.content}</p>

        <div className="interact">
          <div className="comments">
            <p className="counter">{article?.comments ? article.comments.length : 0}</p>
            <i
              className="fa-solid fa-comment"
              onClick={() => {
                setNewComment(true);
                setShowComments(true);
              }}></i>
          </div>

          <div className="likes">
            <p className="counter">{article?.likes ? article.likes : 0}</p>
            <i className="fa-solid fa-thumbs-up" onClick={() => likeArticle(id)}></i>
          </div>
        </div>

        {newComment && (
          <form className="new-comment" onSubmit={addComment}>
            <button className="xmark" onClick={() => setNewComment(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            <textarea
              className="comment-text"
              name="text"
              placeholder="Add comment"
              value={formValues.text}
              required
              onChange={changeHandler}></textarea>
            <button className="create" type="submit">
              Add
            </button>
          </form>
        )}

        {showComments && article?.comments?.length > 0 && (
          <ul className="comments-list">
            <h4>All comments</h4>
            {article.comments.map((item) => (
              <ArticleComment key={item.id} comment={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
