import { useAutoResizeInput } from "../../util/hooks";

export default function ChecklistDetailsItem({ task, index, setFormValues }) {
  const { inputRef, spanRef } = useAutoResizeInput(task.content, 10, 40);

  const handleTickChange = () => {
    setFormValues((prev) => {
      const newElements = [...prev.elements];
      newElements[index] = {
        ...newElements[index],
        status: newElements[index].status !== "Done" ? "Done" : "In Progress",
      };
      return { ...prev, elements: newElements };
    });
  };

  const handleContentChange = (e) => {
    const newValue = e.target.value;
    setFormValues((prev) => {
      const newElements = [...prev.elements];
      newElements[index] = { ...newElements[index], content: newValue };
      return { ...prev, elements: newElements };
    });
  };

  const handleDelete = () => {
    setFormValues((prev) => {
      const newElements = prev.elements.filter((_, i) => i !== index);
      return { ...prev, elements: newElements };
    });
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

      <button type="button" className="delete" onClick={handleDelete}>
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
