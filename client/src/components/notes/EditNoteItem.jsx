import { Link } from "react-router-dom";
import { noteValidation } from "../../util/validation/noteValidation";
import { initialState, validationIsEmpty } from "../../util/validation/commonValidation";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import NavContext from "../../contexts/navContext";
import { editNote, getAllNotesSorted } from "../../services/noteService";

export default function EditNoteItem({ note, editNoteId, setEditNoteId, setNotes, setActiveNoteId, deleteNote }) {
  const [formValues, setFormValues] = useState({
    title: note.title,
    content: note.content,
    dueDate: note.dueDate || "",
    dueTime: note.dueTime || "",
  });

  const [validationErrors, setValidationErrors] = useState(() => initialState(noteValidation.FORM_ERROR_FIELDS));
  const { user } = useContext(AuthContext);
  const { setLoading } = useContext(NavContext);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    const newValues = { ...formValues, [name]: value };
    setFormValues(newValues);

    const errors = noteValidation.getValidationErrors(newValues);
    setValidationErrors(errors);
  };

  async function editNoteHandler(event) {
    event.preventDefault();

    const errors = noteValidation.getValidationErrors(formValues);
    setValidationErrors(errors);

    if (!validationIsEmpty(errors)) {
      return;
    }

    setLoading(true);
    await editNote({ noteId: note?.id, ...formValues });
    const notes = await getAllNotesSorted(user?.id, "startDate", "desc");
    setNotes(notes);
    sessionStorage.setItem("notes", JSON.stringify(notes));
    setLoading(false);
    setEditNoteId("");
    setActiveNoteId(note.id);
  }

  return (
    <div className={editNoteId === note.id ? "note active" : "note"}>
      {editNoteId === note.id && (
        <button
          className="xmark"
          onClick={() => {
            setEditNoteId("");
          }}>
          <i className="fa-solid fa-xmark" />
        </button>
      )}
      <form className="form-edit">
        <input
          id="title"
          className="title"
          name="title"
          placeholder="Add title"
          required
          value={formValues.title}
          onChange={changeHandler}
        />

        <textarea
          id="noteText"
          className="note-text"
          name="content"
          placeholder="Add text"
          required
          value={formValues.content}
          onChange={changeHandler}
        />

        <label className="due-date" htmlFor="dueDate">
          <p>Due date / time</p>
          <input id="dueDate" type="date" name="dueDate" value={formValues.dueDate} onChange={changeHandler} />
        </label>

        <label className="due-time" htmlFor="dueTime">
          <input id="dueTime" type="time" name="dueTime" value={formValues.dueTime} onChange={changeHandler} />
          {/* <i className="fa-regular fa-clock"></i> */}
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

        <button type="submit" className="edit-btn" onClick={editNoteHandler}>
          Save
        </button>
      </form>
      <Link>
        <button
          className="cancel-btn"
          onClick={() => {
            setEditNoteId("");
            setActiveNoteId(note.id);
          }}>
          Cancel
        </button>
      </Link>
      <button className="delete-btn" onClick={() => deleteNote(note.id)}>
        Delete
      </button>
    </div>
  );
}
