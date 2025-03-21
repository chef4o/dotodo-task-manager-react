export default function ChecklistItem({ task }) {
  return (
    <div className="todo-item">
      <input className="tick" type="checkbox" disabled checked={task.status === "Done"} />
      <p className={`todo-item-text ${task.status === "Done" ? "done" : ""}`} id="content">
        {task.content}
      </p>
    </div>
  );
}
