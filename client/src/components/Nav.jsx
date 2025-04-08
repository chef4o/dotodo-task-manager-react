import { useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "../contexts/navContext.jsx";
import AuthContext from "../contexts/authContext.jsx";

export default function Nav() {
  const { handleNavigationClick, selectedPageBg, topNav, sideNav, bottomNav, connectNav } = useContext(NavContext);
  const { user, setShowAuthModal, logout } = useContext(AuthContext);

  return (
    <div className="nav">
      <div className="top-bar">
        {user.id && user.firstName ? (
          <p className="greeting">Hello, {user.firstName}</p>
        ) : (
          user.id && user.username && <p className="greeting">Hello, {user.username}</p>
        )}

        <ul className="top-bar-controls">
          {topNav
            .filter((item) => {
              // For login and register, show only if there's no user id.
              if (item.name === "login" || item.name === "register") {
                return !user.id;
              }
              // For logout, show only if there is a user id.
              if (item.name === "logout") {
                return Boolean(user.id);
              }
              // For administration, show only if there is a user and user.role > 4.
              if (item.name === "administration") {
                return user.id && user.role > 4;
              }
              // Otherwise, show the item.
              return true;
            })
            .map((item) => (
              <li key={item.name}>
                {item.name === "administration" ? (
                  <Link to={item.href}>{item.name}</Link>
                ) : item.name === "logout" ? (
                  <a onClick={() => logout()}>{item.name}</a>
                ) : item.name === "login" || item.name === "register" ? (
                  <a
                    onClick={() =>
                      setShowAuthModal({
                        login: item.name === "login",
                        register: item.name === "register",
                      })
                    }>
                    {item.name}
                  </a>
                ) : (
                  <a onClick={() => handleNavigationClick(item.name)}>{item.name}</a>
                )}
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
            {sideNav.map((item) => (
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
