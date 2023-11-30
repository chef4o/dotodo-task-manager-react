import { useState } from "react";
import PropTypes from "prop-types";
import { sideNavPropType, connectNavPropType } from "../util/propTypes";

export default function Nav(props) {
  const [activePage, setActivePage] = useState("home");

  const handleNavigationClick = (page) => {
    setActivePage(page);
    window.history.pushState(null, null, `/${page}`);

    props.onNavigationClick(page);
  };

  return (
    <div className="sidebar">
      <div className="navigation">
        <div id="logo" onClick={() => handleNavigationClick("home")}>
          <img src="/images/logo.png" alt="DOTODO" />
        </div>
        <ul className="menu">
          {props.sideNav.map(item =>
            <li key={item.name} className={activePage === item.name ? `${item.name} active` : item.name}>
              <div onClick={() => handleNavigationClick(item.name)}><i className={item.icon}></i><br />{item.name}</div>
            </li>
          )}
        </ul>
      </div>

      <div className="connect">
        {props.connectNav.map(item =>
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
};