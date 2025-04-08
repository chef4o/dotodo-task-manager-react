import { useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "../../contexts/navContext";

export default function NoteItem({ note, setActiveNoteId, setEditNoteId, deleteNote, setMakeNew }) {
  const { navigate } = useContext(NavContext);

  return (
    <Link
      to={`/notes/${note.id}`}
      onClick={() => {
        setEditNoteId("");
        setActiveNoteId(note.id);
        setMakeNew(false);
      }}>
      <div className="note inactive">
        <h3>{note.title.length > 17 ? note.title.slice(0, 17) + "..." : note.title}</h3>

        <p className={note.dueDaysHours ? "with-due" : ""}>{note.content}</p>

        {note.dueDaysHours && (
          <div className="due">
            {note.dueDaysHours.expired
              ? "Due has expired"
              : note.dueDaysHours.days
              ? `Due in ${note.dueDaysHours.days > 1 ? note.dueDaysHours.days + " days" : "a day"}`
              : note.dueDaysHours.hours > 0
              ? `Due in ${note.dueDaysHours.hours} hours`
              : note.dueDaysHours.hours === 0
              ? "Due in less than an hour"
              : null}
          </div>
        )}

        <button
          type="button"
          className="edit-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveNoteId("");
            setEditNoteId(note.id);
            setMakeNew(false);
            navigate(`/notes/${note.id}`);
          }}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={(e) => {
            e.preventDefault();
            deleteNote(note.id);
            navigate(`/notes`);
          }}>
          Delete
        </button>
      </div>
    </Link>
  );
}
