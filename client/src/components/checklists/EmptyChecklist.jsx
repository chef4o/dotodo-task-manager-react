import { useContext, useState } from "react";
import { addChecklist, getAllChecklistsSorted } from "../../services/checklistService";
import AuthContext from "../../contexts/authContext";
import { checklistValidation } from "../../util/validation/checklistValidation";
import NavContext from "../../contexts/navContext";
import { initialState, validationIsEmpty } from "../../util/validation/commonValidation";
import { useAutoResizeInput, useAutoScroll } from "../../util/hooks";

export default function EmptyChecklist({ setChecklists, setMakeNew }) {
  const [formValues, setFormValues] = useState(() => {
    const initial = initialState(checklistValidation.FORM_REQUIRED_FIELDS);
    return { ...initial, elements: [] };
  });
  const [validationErrors, setValidationErrors] = useState(() => initialState(checklistValidation.FORM_ERROR_FIELDS));
  const { setLoading } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const containerRef = useAutoScroll(formValues.elements);
  const { inputRef, spanRef } = useAutoResizeInput(formValues.element);

  async function createChecklist(event) {
    event.preventDefault();

    const errors = checklistValidation.getValidationErrors(formValues);
    setValidationErrors(errors);

    if (!validationIsEmpty(errors)) {
      return;
    }

    setLoading(true);
    await addChecklist({ ...formValues, ownerId: user?.id });
    const checklists = await getAllChecklistsSorted(user?.id, "startDate", "desc");
    setChecklists(checklists);
    sessionStorage.setItem("checklists", JSON.stringify(checklists));

    setMakeNew(false);
    setLoading(false);
  }

  function addTask() {
    if (formValues.element) {
      const newElement = {
        content: formValues.element,
        status: "Not started",
      };
      setFormValues((prev) => ({
        ...prev,
        elements: [...prev.elements, newElement],
        element: "",
      }));
    }
  }

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="checklist new">
      <div className="xmark" onClick={() => setMakeNew(false)}>
        <i className="fa-solid fa-xmark"></i>
      </div>

      <input className="title" name="title" placeholder="Add title" value={formValues.title} onChange={changeHandler} />

      <div className="todo-items-container" ref={containerRef}>
        {formValues.elements.map((task, index) => (
          <div key={index} className="todo-item">
            <input className="tick" type="checkbox" />
            <p>{task.content}</p>
          </div>
        ))}

        <div className="new-todo-item">
          <input
            ref={inputRef}
            className="new-todo-item-text"
            name="element"
            value={formValues.element}
            onChange={changeHandler}
            placeholder="Add new item"
          />
          <button type="button" onClick={addTask}>
            <i className="fa-solid fa-square-plus" />
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
            {formValues.element || " "}
          </span>
        </div>
      </div>

      <label className="due-date">
        <p>Due date</p>
        <input id="dueDate" type="date" name="dueDate" value={formValues.dueDate || ""} onChange={changeHandler} />
      </label>

      {!validationIsEmpty(validationErrors) && (
        <div className="error new-note error-list">
          {Object.entries(validationErrors).map(([key, error]) =>
            error ? (
              <p className="error" key={key}>
                {error}
              </p>
            ) : null
          )}
        </div>
      )}

      <button className="create" onClick={createChecklist}>
        Create
      </button>
    </form>
  );
}
