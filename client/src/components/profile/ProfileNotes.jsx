import { Link } from "react-router-dom";
import ProfileNoteDetails from "./ProfileNoteDetails";
import { useState } from "react";
import ProfileNote from "./ProfileNote";

export default function ProfileNotes({ expiringNotes }) {

    const [activeNoteId, setActiveNoteId] = useState('');

    return (
        <div className="expiring-notes">
            <h1>Notes close to expiry</h1>
            {expiringNotes
                ? <ul className="notes-list">
                    {expiringNotes.map(item => item._id === activeNoteId
                        ? <ProfileNoteDetails key={item._id} note={item}
                            activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} />
                        : <ProfileNote key={item._id} note={item}
                            activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} />
                    )}
                </ul>
                : <div>Looks like you don't have any notes yet. You can start from <Link to="/notes">here.</Link></div>
            }
        </div>
    )
}