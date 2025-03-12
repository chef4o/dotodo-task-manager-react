import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { addNote, getAllNotesSorted } from "../../services/noteService";
import { initialState, validationIsEmpty } from "../../util/validation/commonValidation";
import { noteValidation } from "../../util/validation/noteValidation";
import NavContext from "../../contexts/navContext";

export default function EmptyNote({ setNotes, setMakeNew }) {
  const [formValues, setFormValues] = useState(() => initialState(noteValidation.FORM_ERROR_FIELDS));
  const [validationErrors, setValidationErrors] = useState(initialState(noteValidation.FORM_ERROR_FIELDS));
  const { user } = useContext(AuthContext);
  const { setLoading } = useContext(NavContext);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === noteValidation.FORM_ERROR_FIELDS.title) {
      noteValidation.validateTitle(setValidationErrors, value);
    } else if (name === noteValidation.FORM_ERROR_FIELDS.content) {
      noteValidation.validateContent(setValidationErrors, value);
    }
  };

  async function createNote(event) {
    event.preventDefault();

    noteValidation.validateNoteFields(formValues, setValidationErrors);
    if (!validationIsEmpty(validationErrors)) return;

    setLoading(true);
    await addNote({ ...formValues, ownerId: user?.id });

    const notes = await getAllNotesSorted(user?.id, "startDate", "desc");
    setNotes(notes);
    sessionStorage.setItem("notes", JSON.stringify(notes));

    setMakeNew(false);
    setLoading(false);
  }

  return (
    <form className="note new">
      <Link className="xmark" onClick={() => setMakeNew(false)}>
        <i className="fa-solid fa-xmark"></i>
      </Link>

      <input
        className="title"
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

      <label className="due-date">
        <p>Due date / time</p>
        <input id="dueDate" type="date" name="dueDate" value={formValues.dueDate} onChange={changeHandler} />
      </label>

      <label className="due-time">
        <input id="dueTime" type="time" name="dueTime" value={formValues.dueTime} onChange={changeHandler} />
      </label>

      {(validationErrors["title"] || validationErrors["content"]) && (
        <div className="error new-note error-list">
          {Object.entries(validationErrors).map(([key, error]) =>
            error ? (
              <p className="error" key={key}>
                {error}
              </p>
            ) : null
          )}
        </div>
      )}

      <button className="create" type="submit" onClick={createNote}>
        Create
      </button>
    </form>
  );
}
