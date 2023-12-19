import { useState } from "react";
import { addChecklist } from "../../services/checklistService";

export default function EmptyChecklist({ user, setChecklists }) {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    async function createChecklist() {
        if (title) {
            const newChecklist = {
                title: title,
                status: "Not started",
                events: tasks
            };

            await addChecklist(user._id, newChecklist);
            setChecklists((state) => [...state, newChecklist]);
            setTitle('');
            setText('');
            setTasks([]);
        }
    }

    function addTask(text) {
        if (text) {
            const newTask = {
                content: text,
                status: "Not started",
            };
            setTasks((state) => [...state, newTask]);
            setText('');
        }

        console.log(tasks)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <div className="checklist new">
            <input className="title" value={title} placeholder="Create new checklist" onChange={handleTitleChange} />

            <div className="new-note">
                <input value={text} onChange={e => setText(e.target.value)} />
                <button onClick={() => addTask(text)}>Add</button>
            </div>

            {Object.values(tasks).map(task =>
                <div key={task.content} className="todo-item">
                    <input
                        className="tick"
                        type="checkbox"
                    />
                    <p>{task.content}</p>
                </div>
            )}

            <button className="create" onClick={createChecklist}>Create</button>

        </div>
    );
}