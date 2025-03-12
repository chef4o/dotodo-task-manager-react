import { Link } from "react-router-dom";

export default function NoteItem({ note, setActiveNoteId, setEditNoteId, deleteNote }) {
  return (
    <Link onClick={() => setActiveNoteId(note.id)}>
      <div className="note inactive">
        <h3>{note.title}</h3>
        <p className={note.dueDaysHours ? "with-due" : ""}>{note.content}</p>

        {note.dueDaysHours && (
          <div className="due">
            {note.dueDaysHours.days
              ? `Due in ${note.dueDaysHours.days > 1 ? note.dueDaysHours.days + " days" : "a day"}`
              : note.dueDaysHours.hours > 0
              ? `Due in ${note.dueDaysHours.hours} hours`
              : note.dueDaysHours.hours === 0
              ? "Due in less than an hour"
              : "Due has expired"}
          </div>
        )}

        <button className="edit-btn" onClick={() => setEditNoteId(note.id)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => deleteNote(note.id)}>
          Delete
        </button>
      </div>
    </Link>
  );
}
