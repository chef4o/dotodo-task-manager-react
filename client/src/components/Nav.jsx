import PropTypes from "prop-types";
import { sideNavPropType, connectNavPropType } from "../util/propTypes";

export default function Nav({ sideNav, connectNav, selectedPage, onNavigationClick }) {

  const handleNavigationClick = (page) => {
    window.history.pushState(null, null, `/${page}`);

    onNavigationClick(page);
  };

  return (
    <div className="sidebar">
      <div className="navigation">
        <div id="logo" onClick={() => handleNavigationClick("home")}>
          <img src="/images/logo.png" alt="DOTODO" />
        </div>
        <ul className="menu">
          {sideNav.map(item =>
            <li key={item.name} className={selectedPage===item.name ? `${item.name} active` : item.name}>
              <div onClick={() => handleNavigationClick(item.name)}><i className={item.icon}></i><br />{item.name}</div>
            </li>
          )}
        </ul>
      </div>

      <div className="connect">
        {connectNav.map(item =>
          <a key={item.id} href={item.url} id={item.id} target="_blank" rel="noreferrer"><i className={item.icon}></i></a>
        )}
      </div>
    </div>
  );
}

Nav.propTypes = {
  sideNav: PropTypes.arrayOf(sideNavPropType).isRequired,
  connectNav: PropTypes.arrayOf(connectNavPropType).isRequired,
  onNavigationClick: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
};