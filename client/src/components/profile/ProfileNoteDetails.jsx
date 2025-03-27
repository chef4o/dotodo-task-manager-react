export default function ProfileNoteDetails({ note, activeNoteId, setActiveNoteId }) {
  const handleXmarkClick = (event) => {
    event.stopPropagation();
    setActiveNoteId("");
  };

  return (
    <div className="note active details">
      <button className="xmark" onClick={handleXmarkClick}>
        <i className="fa-solid fa-xmark" />
      </button>

      <h3 className="title" name="title">
        {note.title}
      </h3>

      <p className="note-text" name="content">
        {note.content}
      </p>

      {note.dueDate && (
        <div className="due-date" text={!!note.dueTime ? "Due date / time" : "Due date"}>
          <div>
            <p>{note.dueDate}</p>
            <i className="fa-regular fa-calendar"></i>
          </div>

          {note.dueTime && (
            <div>
              <p>{note.dueTime}</p>
              <i className="fa-regular fa-clock"></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
