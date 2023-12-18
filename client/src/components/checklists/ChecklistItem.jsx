export default function ChecklistItem({ task, deleteTask, toggleCompleted }) {
    function handleChange() {
        toggleCompleted(task._id);
    }

    return (
        <div className="todo-item">
            <input
                className="tick"
                type="checkbox"
                checked={task.status === 'Done'}
                onChange={handleChange}
            />
            <p className={`todo-item-text ${task.status === 'Done' ? 'done' : ''}`}>{task.content}</p>
            <button className="delete" onClick={() => deleteTask(task._id)}>
                <i className="fa-solid fa-trash-can" />
            </button>
        </div>
    );
}