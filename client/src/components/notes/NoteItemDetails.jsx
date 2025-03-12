export default function NoteItem({ note, activeNoteId, setActiveNoteId, deleteNote }) {
  const handleXmarkClick = (event) => {
    event.stopPropagation();
    setActiveNoteId("");
  };

  return (
    <div className={activeNoteId === note.id ? "note active" : "note"} onClick={() => setActiveNoteId(note.id)}>
      {activeNoteId === note.id && (
        <button className="xmark" onClick={handleXmarkClick}>
          <i className="fa-solid fa-xmark" />
        </button>
      )}
      <h3>{note.title.length > 20 ? `${note.title.slice(0, 20)}...` : note.title}</h3>
      <p>{note.content}</p>
      <button className="delete-btn" onClick={() => deleteNote(note.id)}>
        Delete
      </button>
    </div>
  );
}
