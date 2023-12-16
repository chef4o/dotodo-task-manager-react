import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function TaskType({ name, headerText, onItemClick }) {

    const handleNavigationClick = (page) => {
        onItemClick(page);
    };

    return (
        <Link to={name} onClick={() => handleNavigationClick(name.toLocaleLowerCase())}>
            <li className={name.toLocaleLowerCase()}>
                <h4>{name}</h4>
                <h3 className="header-text">{headerText}</h3>
            </li>
        </Link>
    )
}

TaskType.propTypes = {
    name: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
};