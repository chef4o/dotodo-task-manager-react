import { useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "../contexts/navContext";
import AuthContext from "../contexts/authContext";

export default function Nav({ topNav, sideNavElements, connectNav, bottomNav }) {
  const { handleNavigationClick, selectedPageBg } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="nav">
      <div className="top-bar">
        {user.firstName 
        ? <p className="greeting">Hello, {user.firstName}</p>
        : user.username && <p className="greeting">Hello, {user.username}</p>}

        <ul className="top-bar-controls">
          {topNav
            .filter((item) => item.name !== "administration" || user.role > 3)
            .map((item) => (
            <li key={item.name}>
              {item.name == "administration"
              ? <Link to={item.href}>{item.name}</Link> 
              : <a onClick={() => handleNavigationClick(item.name)}>{item.name}</a>
              }
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar">
        <div className="navigation">
          <Link to="/" id="logo" onClick={() => handleNavigationClick("home")}>
            <img src="/images/logo.png" alt="DOTODO" />
          </Link>
          <ul className="menu">
            {sideNavElements.map((item) => (
              <li key={item.name} className={selectedPageBg === item.name ? `${item.name} active` : item.name}>
                <Link
                  to={item.name === "profile" ? `${item.href}/${user.id}` : item.href}
                  onClick={() => handleNavigationClick(item.name)}>
                  <i className={item.icon}></i>
                  <p>{item.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="connect">
          {connectNav.map((item) => (
            <a key={item.id} href={item.url} id={item.id} target="_blank" rel="noreferrer">
              <i className={item.icon}></i>
            </a>
          ))}
        </div>
      </div>

      <ul className="bottom-bar">
        {bottomNav.map((item) => (
          <li key={item.name}>
            <Link to={item.name} onClick={() => handleNavigationClick(item.name)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
