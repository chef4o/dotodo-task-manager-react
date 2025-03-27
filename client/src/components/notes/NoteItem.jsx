import { Link } from "react-router-dom";

export default function NoteItem({ note, setActiveNoteId, setEditNoteId, deleteNote, setMakeNew, navigate }) {
  return (
    <div className="note inactive">
      <Link
        to={`/notes/${note.id}`}
        onClick={() => {
          setEditNoteId("");
          setActiveNoteId(note.id);
          setMakeNew(false);
        }}></Link>

      <h3>{note.title.length > 14 ? note.title.slice(0, 14) + "..." : note.title}</h3>

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
  );
}
