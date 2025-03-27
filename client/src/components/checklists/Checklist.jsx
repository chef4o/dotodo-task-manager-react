import { Link } from "react-router-dom";
import ChecklistItem from "./ChecklistItem";

export default function Checklist({
  checklist,
  activeChecklistId,
  setActiveChecklistId,
  deleteChecklist,
  setMakeNew,
  navigate,
}) {
  const handleXmarkClick = (event) => {
    event.stopPropagation();
    setActiveChecklistId("");
    navigate("/checklists");
  };

  return (
    <div className={activeChecklistId === checklist.id ? "checklist active" : "checklist"}>
      <Link
        to={`/checklists/${checklist.id}`}
        onClick={() => {
          setMakeNew(false);
          setActiveChecklistId(checklist.id);
        }}></Link>

      {activeChecklistId === checklist.id && (
        <button className="xmark" onClick={handleXmarkClick}>
          <i className="fa-solid fa-xmark" />
        </button>
      )}

      <h3 className="title">{checklist.title}</h3>

      <div className="todo-items-container">
        {checklist.elements.map((task, index) => (
          <ChecklistItem key={index} task={task} />
        ))}
      </div>

      <button
        className="edit-btn"
        onClick={() => {
          setActiveChecklistId("");
          setMakeNew(false);
        }}>
        Edit
      </button>

      <button className="delete-btn" onClick={() => deleteChecklist(checklist.id)}>
        Delete
      </button>
    </div>
  );
}
