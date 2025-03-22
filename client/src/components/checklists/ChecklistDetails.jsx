import { useContext, useState } from "react";
import { checklistValidation } from "../../util/validation/checklistValidation";
import ChecklistDetailsItem from "./ChecklistDetailsItem";
import { initialState, validationIsEmpty } from "../../util/validation/commonValidation";
import { editChecklist, getAllChecklistsSorted } from "../../services/checklistService";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";
import { useAutoResizeInput } from "../../util/hooks";

export default function ChecklistDetails({
  checklist,
  activeChecklistId,
  setActiveChecklistId,
  deleteChecklist,
  setChecklists,
}) {
  const [formValues, setFormValues] = useState({
    title: checklist.title,
    elements: checklist.elements,
    dueDate: checklist.dueDate || "",
    element: "",
  });

  const [validationErrors, setValidationErrors] = useState(() => initialState(checklistValidation.FORM_ERROR_FIELDS));
  const { user } = useContext(AuthContext);
  const { setLoading } = useContext(NavContext);

  const { inputRef, spanRef } = useAutoResizeInput(formValues.element);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    const newValues = { ...formValues, [name]: value };
    setFormValues(newValues);

    const errors = checklistValidation.getValidationErrors(newValues);
    setValidationErrors(errors);
  };

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

  async function editChecklistHandler(event) {
    event.preventDefault();

    const errors = checklistValidation.getValidationErrors(formValues);
    setValidationErrors(errors);

    if (!validationIsEmpty(errors)) {
      return;
    }

    setLoading(true);
    await editChecklist(checklist?.id, formValues);
    const checklists = await getAllChecklistsSorted(user?.id, "startDate", "desc");
    setChecklists(checklists);
    sessionStorage.setItem("checklists", JSON.stringify(checklists));
    setLoading(false);
    setActiveChecklistId("");
  }

  return (
    <form className={activeChecklistId === checklist.id ? "checklist active" : "checklist"}>
      {activeChecklistId === checklist.id && (
        <button className="xmark" onClick={() => setActiveChecklistId("")}>
          <i className="fa-solid fa-xmark" />
        </button>
      )}

      <input
        id="title"
        className="title"
        name="title"
        placeholder="Add title"
        required
        value={formValues.title}
        onChange={changeHandler}
      />

      <label className="due-date" htmlFor="dueDate">
        <p>Due date</p>
        <input id="dueDate" type="date" name="dueDate" value={formValues.dueDate} onChange={changeHandler} />
      </label>

      <div className="todo-items-container">
        {formValues.elements.map((task, index) => (
          <ChecklistDetailsItem
            key={task.id || index}
            task={task}
            index={index}
            formValues={formValues}
            setFormValues={setFormValues}
          />
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

      {!validationIsEmpty(validationErrors) && (
        <div className="error new-checklist error-list">
          {Object.entries(validationErrors).map(([key, error]) =>
            error ? (
              <p className="error" key={key}>
                {error}
              </p>
            ) : null
          )}
        </div>
      )}

      <button className="edit-btn" onClick={editChecklistHandler}>
        Save
      </button>

      <button className="delete-btn" onClick={() => deleteChecklist(checklist.id)}>
        Delete
      </button>
    </form>
  );
}
