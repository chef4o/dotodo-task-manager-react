export default function NoteItem({ note, setEditNoteId, activeNoteId, setActiveNoteId, deleteNote, setMakeNew }) {
  const handleXmarkClick = (event) => {
    event.stopPropagation();
    setActiveNoteId("");
  };

  return (
    <div className={activeNoteId === note.id ? "note active" : "note"}>
      {activeNoteId === note.id && (
        <button className="xmark" onClick={handleXmarkClick}>
          <i className="fa-solid fa-xmark" />
        </button>
      )}
      <h3 className="title">{note.title.length > 50 ? note.title.slice(0, 50) + "..." : note.title}</h3>
      <p className="note-text">{note.content}</p>

      {note.dueDate && (
        <>
          {note.dueDate && !note.dueTime ? (
            <div className="due-date">
              Due date
              <div>
                <p>{note.dueDate}</p>
                <i className="fa-regular fa-calendar"></i>
              </div>
            </div>
          ) : (
            <div className="due-date">
              Due date / time
              <div>
                <p>{note.dueDate}</p>
                <i className="fa-regular fa-calendar"></i>
              </div>
              <div className="time">
                <p>{note.dueTime}</p>
                <i className="fa-regular fa-clock"></i>
              </div>
            </div>
          )}
        </>
      )}

      <button
        className="edit-btn"
        onClick={() => {
          setActiveNoteId("");
          setEditNoteId(note.id);
          setMakeNew(false);
        }}>
        Edit
      </button>

      <button className="delete-btn" onClick={() => deleteNote(note.id)}>
        Delete
      </button>
    </div>
  );
}
