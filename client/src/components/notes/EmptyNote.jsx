import { useContext, useState } from "react";
import { addNote, getAllNotesSorted } from "../../services/noteService";
import { initialState, validationIsEmpty } from "../../util/validation/commonValidation";
import { noteValidation } from "../../util/validation/noteValidation";
import AuthContext from "../../contexts/authContext.jsx";
import NavContext from "../../contexts/navContext.jsx";

export default function EmptyNote({ setNotes, setMakeNew }) {
  const { setLoading } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const [formValues, setFormValues] = useState(() => initialState(noteValidation.FORM_REQUIRED_FIELDS));
  const [validationErrors, setValidationErrors] = useState(() => initialState(noteValidation.FORM_ERROR_FIELDS));

  const changeHandler = (event) => {
    const { name, value } = event.target;
    const newValues = { ...formValues, [name]: value };
    setFormValues(newValues);

    const errors = noteValidation.getValidationErrors(newValues);
    setValidationErrors(errors);
  };

  async function createNote(event) {
    event.preventDefault();

    const errors = noteValidation.getValidationErrors(formValues);
    setValidationErrors(errors);

    if (!validationIsEmpty(errors)) {
      return;
    }

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
      <div className="xmark" onClick={() => setMakeNew(false)}>
        <i className="fa-solid fa-xmark"></i>
      </div>

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
        <input id="dueDate" type="date" name="dueDate" value={formValues.dueDate || ""} onChange={changeHandler} />
      </label>

      <label className="due-time">
        <input id="dueTime" type="time" name="dueTime" value={formValues.dueTime || ""} onChange={changeHandler} />
      </label>

      {!validationIsEmpty(validationErrors) && (
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

      <button className="create" onClick={createNote}>
        Create
      </button>
    </form>
  );
}
