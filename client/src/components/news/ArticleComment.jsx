import { formatToDateTime } from "../../util/dataUtils";

export default function ArticleComment({ comment }) {
  return (
    <div className="comment">
      <div className="left-container">
        <p className="author">Author: {comment.author}</p>
        <p className="date">{formatToDateTime(comment.createdAt)}</p>
      </div>
      <div className="right-container">
        <p className="text">{comment.text}</p>
      </div>
    </div>
  );
}
