import { useAutoResizeInput } from "../../util/hooks";

export default function ChecklistDetailsItem({ task, onUpdateTask, onDeleteTask }) {
  const { inputRef, spanRef } = useAutoResizeInput(task.content, 10, 40);

  const handleTickChange = () => {
    const newStatus = task.status !== "Done" ? "Done" : "In Progress";
    onUpdateTask({ ...task, status: newStatus });
  };

  const handleContentChange = (e) => {
    onUpdateTask({ ...task, content: e.target.value });
  };

  return (
    <div className="todo-item">
      <input className="tick" type="checkbox" checked={task.status === "Done"} onChange={handleTickChange} />
      <input
        className={`todo-item-text ${task.status === "Done" ? "done" : ""}`}
        id="content"
        name="content"
        type="text"
        ref={inputRef}
        value={task.content}
        onChange={handleContentChange}
        onBlur={handleContentChange}
      />
      
      <button type="button" className="delete" onClick={onDeleteTask}>
        <i className="fa-solid fa-square-minus" />
      </button>

      <span
        ref={spanRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          fontSize: "inherit",
          fontFamily: "inherit",
        }}>
        {task.content || " "}
      </span>
    </div>
  );
}
