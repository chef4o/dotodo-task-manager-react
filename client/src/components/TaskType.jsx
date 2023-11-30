import PropTypes from "prop-types";

export default function TaskType({ name, headerText, onItemClick }) {

    const handleNavigationClick = (page) => {
        window.history.pushState(null, null, `/${page}`);

        onItemClick(page);
    };

    return (
        <div onClick={() => handleNavigationClick(name.toLocaleLowerCase())}>
            <li className={name.toLocaleLowerCase()}>
                <h4>{name}</h4>
                <h3 className="header-text">{headerText}</h3>
            </li>
        </div>
    )
}

TaskType.propTypes = {
    name: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
};