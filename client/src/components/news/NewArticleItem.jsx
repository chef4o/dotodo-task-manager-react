import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import { addArticle, getAllArticlesSorted } from "../../services/newsService";
import { initialState, validationIsEmpty } from "../../util/validation/commonValidation";
import { newsValidation } from "../../util/validation/newsValidation.js";
import NavContext from "../../contexts/navContext";
import NoAccess from "../error/NoAccess.jsx";

export default function NewArticleItem() {
  const [formValues, setFormValues] = useState(() => initialState(newsValidation.FORM_REQUIRED_FIELDS));
  const [validationErrors, setValidationErrors] = useState(() => initialState(newsValidation.FORM_REQUIRED_FIELDS));
  const { user } = useContext(AuthContext);
  const { handleNavigationClick, setLoading, navigate } = useContext(NavContext);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    const newValues = { ...formValues, [name]: value };
    setFormValues(newValues);

    const errors = newsValidation.getValidationErrors(newValues);
    setValidationErrors(errors);
  };

  async function createArticle(event) {
    event.preventDefault();

    const errors = newsValidation.getValidationErrors(formValues);
    setValidationErrors(errors);

    if (!validationIsEmpty(errors)) {
      return;
    }

    setLoading(true);
    await addArticle({ ...formValues, ownerId: user?.id });
    const news = await getAllArticlesSorted("uploadDate", "desc");
    sessionStorage.setItem("news", JSON.stringify(news));
    setLoading(false);
    navigate("/news")
  }

  return (
    <div className="content news">
      {!user?.id ? (
        <NoAccess onItemClick={handleNavigationClick} />
      ) : (
        <form className="news new">
          <h3>New article</h3>

          <div className="xmark" onClick={() => navigate("/news")}>
            <i className="fa-solid fa-xmark"></i>
          </div>

          <input
            className="header"
            name="title"
            placeholder="Add title"
            value={formValues.title}
            required
            onChange={changeHandler}
          />

          <textarea
            className="note-text"
            name="content"
            placeholder="Add text"
            value={formValues.content}
            required
            onChange={changeHandler}></textarea>

          {!validationIsEmpty(validationErrors) && (
            <div className="error new-article error-list">
              {Object.entries(validationErrors).map(([key, error]) =>
                error ? (
                  <p className="error" key={key}>
                    {error}
                  </p>
                ) : null
              )}
            </div>
          )}

          <button className="create" onClick={createArticle}>
            Create
          </button>
        </form>
      )}
    </div>
  );
}
