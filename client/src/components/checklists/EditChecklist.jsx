import EditChecklistItem from "./EditChecklistItem";

export default function EditChecklist({
  checklist,
  setEditChecklistId,
  activeChecklistId,
  setActiveChecklistId,
  deleteChecklist,
  setMakeNew,
}) {
  const handleXmarkClick = (event) => {
    event.stopPropagation();
    setActiveChecklistId("");
  };

  return (
    <form className={activeChecklistId === checklist.id ? "checklist active" : "checklist"}>
      {activeChecklistId === checklist.id && (
        <button className="xmark" onClick={handleXmarkClick}>
          <i className="fa-solid fa-xmark" />
        </button>
      )}
      <input
        className="title"
        value={checklist.title.length > 50 ? checklist.title.slice(0, 50) + "..." : checklist.title}></input>

      {checklist.dueDate && (
        <div className="due-date">
          Due date
          <div>
            <p>{checklist.dueDate}</p>
            <i className="fa-regular fa-calendar"></i>
          </div>
        </div>
      )}

      <button
        className="edit-btn"
        onClick={() => {
          setActiveChecklistId("");
          setEditChecklistId(checklist.id);
          setMakeNew(false);
        }}>
        Edit
      </button>

      <button className="delete-btn" onClick={() => deleteChecklist(checklist.id)}>
        Delete
      </button>

      {checklist.elements.map((task) => (
        <EditChecklistItem key={task.id} task={task} />
      ))}
    </form>
  );
}
