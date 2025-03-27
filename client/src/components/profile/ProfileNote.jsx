import { Link } from "react-router-dom";

export default function ProfileNote({ note, setActiveNoteId }) {
  return (
    <Link onClick={() => setActiveNoteId(note.id)}>
      <div className="note inactive">
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
      </div>
    </Link>
  );
}
