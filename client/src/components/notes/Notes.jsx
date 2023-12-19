import { useEffect, useState } from "react"
import { getAllNotes } from "../../services/noteService";
import NoteItem from "./NoteItem";
import NoAccess from "../error/NoAccess";

export default function Notes({ user, onItemClick }) {

    const [notes, setNotes] = useState([]);
    const [activeNoteId, setActiveNoteId] = useState('');

    useEffect(() => {
        if (user._id) {
            getAllNotes(user._id)
                .then(data => {
                    setNotes(data);
                });
        }
    }, [user]);

    return (
        <div className="content notes">

            {!user._id
                ? <NoAccess onItemClick={onItemClick} />
                : notes
                    ? <ul className="notes-list">
                        {notes.map(item =>
                            <NoteItem key={item._id} note={item} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} />
                        )}
                    </ul>
                    : <div>No items</div>
            }
        </div>
    )
}