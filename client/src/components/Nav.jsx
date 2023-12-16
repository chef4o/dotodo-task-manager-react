import PropTypes from "prop-types";
import { sideNavPropType, connectNavPropType, bottomNavPropType } from "../util/propTypes";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import { useEffect } from "react";

export default function Nav({
  topNav,
  sideNavElements,
  connectNav,
  bottomNav,
  showAuthModal,
  hideAuthModal,
  selectedPageBg,
  onNavigationClick,
  user,
  setUser,
}) {

  const handleNavigationClick = (page) => {
    window.history.pushState(null, null, `/${page}`);
    onNavigationClick(page);
  };

  return (

    <div className="nav">
      {(showAuthModal.login || showAuthModal.register) && <div className="backdrop" onClick={hideAuthModal} />}

      {showAuthModal.login && <LoginModal
        selectedPageBg={selectedPageBg}
        hideAuthModal={hideAuthModal}
        setUser={setUser} />}

      {showAuthModal.register && <RegisterModal
        selectedPageBg={selectedPageBg}
        hideAuthModal={hideAuthModal}
        setUser={setUser} />}

      <ul className="top-bar">
        {topNav.map(item =>
          <li key={item.name}><div onClick={() => handleNavigationClick(item.name)}>{item.name}</div></li>
        )}
      </ul>

      <div className="sidebar">
        <div className="navigation">
          <div id="logo" onClick={() => handleNavigationClick("home")}>
            <img src="/images/logo.png" alt="DOTODO" />
          </div>
          <ul className="menu">
            {sideNavElements.map(item =>
              <li key={item.name} className={selectedPageBg === item.name ? `${item.name} active` : item.name}>
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

      <ul className="bottom-bar">
        {bottomNav.map(item =>
          <li key={item.name}><div onClick={() => handleNavigationClick(item.name)}>{item.name}</div></li>
        )}
      </ul>
    </div>
  );
}

Nav.propTypes = {
  sideNavElements: PropTypes.arrayOf(sideNavPropType).isRequired,
  connectNav: PropTypes.arrayOf(connectNavPropType).isRequired,
  bottomNav: PropTypes.arrayOf(bottomNavPropType).isRequired,
  topNav: PropTypes.arrayOf(bottomNavPropType).isRequired,
  onNavigationClick: PropTypes.func.isRequired,
  selectedPageBg: PropTypes.string.isRequired,
};
