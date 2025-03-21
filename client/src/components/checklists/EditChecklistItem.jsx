import { useState } from "react";

export default function EditChecklistItem({ task, deleteTask }) {

    const [formValues, setFormValues] = useState({ ...task });

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    const handleTickChange = async () => {
        const newStatus = formValues.taskStatus !== 'Done' ? 'Done' : 'In Progress';
        setFormValues((state) => ({
            ...state,
            taskStatus: newStatus
        }));
    };

    return (
        <form method="post" className="todo-item">
            <input
                className="tick"
                type="checkbox"
                checked={formValues.taskStatus === 'Done'}
                onChange={handleTickChange}
            />
            <input
                className={`todo-item-text ${formValues.taskStatus === 'Done' ? 'done' : ''}`}
                id="content"
                name="content"
                type="text"
                value={formValues.content}
                onChange={changeHandler}
                onBlur={changeHandler}
            />
            <button className="delete" onClick={() => deleteTask(task.id)}>
                <i className="fa-solid fa-square-minus" />
            </button>
        </form>
    );
}