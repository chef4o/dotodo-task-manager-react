import PropTypes from "prop-types";
import { footerNavPropType } from "../util/propTypes"

export default function Footer(props) {

  const handleNavigationClick = (page) => {
    window.history.pushState(null, null, `/${page}`);
  };

  return (
    <div className="footer">
      <p>&#169; 2023 DOTODO Task Manager</p>

      <ul>
        {props.footerNav.map(item =>
          <li key={item.name}><div onClick={() => handleNavigationClick(item.name)}>{item.name}</div></li>
        )}
      </ul>
    </div>
  );
}

Footer.propTypes = {
  footerNav: PropTypes.arrayOf(footerNavPropType).isRequired,
};
