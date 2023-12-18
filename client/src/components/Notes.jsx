import { useEffect, useState } from "react"
import { getAllNotes } from "../services/noteService";
import Note from "./Note";
import { useNavigate } from "react-router-dom";
const testUserid = "07f260f4-466c-4607-9a33-f7273b24f1b4";

export default function Notes({ user }) {

    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [activeNoteId, setActiveNoteId] = useState('');

    useEffect(() => {
        // if (!user._id) {
        //     navigate('/403');
        //     return;
        // }

        getAllNotes(testUserid)
            .then(data => {
                setNotes(data);
            });
    }, [user]);

    return (
        <div className="content notes">
            {notes && <ul className="notes-list">
                    {notes.map(item =>
                        <Note key={item._id} note={item} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} />
                    )}
                </ul>}
             {!notes && <div>No items</div>}
        </div>
    )
}