import { Link } from "react-router-dom";
import { formatToDateTime } from "../../util/dataUtils";

export default function ArticleItem({ article }) {
  return (
    <li className="article">
      <Link to={`/news/${article.id}`} onClick={() => {}}></Link>
      <h4>{article.title}</h4>

      <div className="posted-on">Posted on {formatToDateTime(article.uploadDate)}</div>

      <div className="interact">
        <Link to={`/news/${article.id}`} className="comments">
          {article.comments?.length > 0 ? `${article.comments?.length} Comments` : "0 Comments"}
        </Link>
        <span className="comments">|</span>
        <Link to={`/news/${article.id}`} className="comments">
          {article?.likes > 0 ? `${article?.likes} Likes` : "0 Likes"}
        </Link>
      </div>

      <p>{article.content}</p>

      <Link to={`/news/${article.id}`} className="read-more">
        Read More
      </Link>
    </li>
  );
}
