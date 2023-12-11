import PropTypes from "prop-types";
import { sideNavPropType, connectNavPropType, bottomNavPropType } from "../util/propTypes";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

export default function Nav({
  topNav, sideNav, connectNav, bottomNav,
  showLoginModal, showRegisterModal, hideAuthModal,
  selectedPage,
  onNavigationClick }) {

  const handleNavigationClick = (page) => {
    window.history.pushState(null, null, `/${page}`);

    onNavigationClick(page);
  };

  return (

    <div className="nav">
      {(showLoginModal || showRegisterModal) && <div className="backdrop" onClick={hideAuthModal} />}

      {showLoginModal && <LoginModal modalName="login" selectedPage={selectedPage} showLoginModal={showLoginModal} hideAuthModal={hideAuthModal} />}
      {showRegisterModal && <RegisterModal modalName="register" selectedPage={selectedPage} hideAuthModal={hideAuthModal} />}

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
            {sideNav.map(item =>
              <li key={item.name} className={selectedPage === item.name ? `${item.name} active` : item.name}>
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
  sideNav: PropTypes.arrayOf(sideNavPropType).isRequired,
  connectNav: PropTypes.arrayOf(connectNavPropType).isRequired,
  bottomNav: PropTypes.arrayOf(bottomNavPropType).isRequired,
  topNav: PropTypes.arrayOf(bottomNavPropType).isRequired,
  onNavigationClick: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
};
