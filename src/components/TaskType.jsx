import { taskTypePropType } from "../utils/propTypes";

export default function TaskType(props) {

    const handleNavigationClick = (page) => {
        window.history.pushState(null, null, `/${page}`);
    };

    return (
        <div onClick={() => handleNavigationClick(props.task.name.toLocaleLowerCase())}>
            <li className={props.task.name.toLocaleLowerCase()}>
                <h4>{props.task.name}</h4>
                <h3 className="header-text">{props.task.headerText}</h3>
            </li>
        </div>
    )
}

TaskType.propTypes = {
    task: taskTypePropType.isRequired,
};