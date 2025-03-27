import { Link } from "react-router-dom";
import ProfileNote from "./ProfileNote";

export default function ProfileNotes({ activeNoteId, setActiveNoteId, expiringNotes }) {
  return (
    <div className="expiring-notes">
      <h1>Notes close to expiry</h1>
      {expiringNotes?.length > 0 ? (
        <ul className="notes-list">
          {expiringNotes.map((item) =>
            item.id != activeNoteId ? <ProfileNote key={item.id} note={item} setActiveNoteId={setActiveNoteId} /> : null
          )}
        </ul>
      ) : (
        <div className="error-page no-content">
          Looks like you don't have any notes yet. <br />
          You can start from <Link to="/notes">here.</Link>
        </div>
      )}
    </div>
  );
}
