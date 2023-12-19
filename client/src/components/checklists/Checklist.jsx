import { useContext, useEffect, useState } from "react";
import ChecklistItem from "./ChecklistItem";
import { deleteChecklistItem } from "../../services/checklistService";
import AuthContext from "../../contexts/authContext";

export default function Checklist({ checklist, activeChecklistId, setActiveChecklistId, deleteChecklist }) {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [title, setTitle] = useState(checklist.title);

    const { user } = useContext(AuthContext);

    function addTask(text) {
        if (text) {
            const newTask = {
                content: text,
                status: "Not started",
            };
            setTasks([...tasks, newTask]);
            setText('');
        }
    }

    async function deleteTask(taskId) {
        await deleteChecklistItem(user._id, checklist._id, taskId)
        setTasks(tasks.filter(task => task._id !== taskId));
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
            if (task._id === id) {
                return { ...task, status: task.status !== 'Done' ? 'Done' : 'In progress' };
            } else {
                return task;
            }
        }));
    }

    useEffect(() => {
        if (checklist.elements) {
            setTasks(Object.values(checklist.elements));
        }
    }, [checklist.elements]);

    const handleXmarkClick = (event) => {
        event.stopPropagation();
        setActiveChecklistId("");
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTitleBlur = () => {
        //todo add to backend
    };

    return (
        <div className={activeChecklistId === checklist._id ? "checklist active" : "checklist"}
            onClick={() => setActiveChecklistId(checklist._id)}>
            {activeChecklistId === checklist._id &&
                <button className="xmark" onClick={handleXmarkClick}>
                    <i className="fa-solid fa-xmark" />
                </button>}

            <button className="delete-checklist" onClick={() => deleteChecklist(checklist._id)}>
                <i className="fa-solid fa-trash-can" />
            </button>

            <input className="title" value={title} onChange={handleTitleChange} onBlur={handleTitleBlur} />

            <div className="new-note">
                <input value={text} onChange={e => setText(e.target.value)} />
                <button onClick={() => addTask(text)}>Add</button>
            </div>

            {tasks.map(task => (
                <ChecklistItem
                    key={task._id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                />
            ))}
        </div>
    );
}
