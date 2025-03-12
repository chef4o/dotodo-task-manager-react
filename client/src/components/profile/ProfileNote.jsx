export default function ProfileNote({ note, activeNoteId, setActiveNoteId }) {

    const handleXmarkClick = (event) => {
        event.stopPropagation();
        setActiveNoteId("");
    };

    return (
        <div className={activeNoteId === note.id ? "note active" : "note"} onClick={() => setActiveNoteId(note.id)}>
            {activeNoteId === note.id &&
                <button className="xmark" onClick={handleXmarkClick}>
                    <i className="fa-solid fa-xmark" />
                </button>}
            <h3>{note.title}</h3>
            <p>{note.content}</p>
        </div>
    );
}