import { useState } from "react";

export default function Nav() {
  const [activePage, setActivePage] = useState("home");
  
  const handleNavigationClick = (page) => {
    setActivePage(page);
    window.history.pushState(null, null, `/${page}`);
  };

  return (
    <div className="sidebar"> 
      <div className="navigation">
        <div id="logo" onClick={() => handleNavigationClick("home")}> 
          <img src="/static/images/logo.png" alt="DOTODO" />
        </div>
        <ul className="menu">
            <li className={activePage === "home" ? "home active" : "home"}>
              <div onClick={() => handleNavigationClick("home")}><i className="fa-solid fa-house"></i><br />Home</div>
            </li>
          <li className={activePage === "notes" ? "notes active" : "notes"}>
            <div onClick={() => handleNavigationClick("notes")}><i className="fa-solid fa-note-sticky"></i><br />Notes</div>
          </li>
          <li className={activePage === "checklists" ? "checklists active" : "checklists"}>
            <div onClick={() => handleNavigationClick("checklists")}><i className="fa-solid fa-list-check"></i><br />To-do</div>
          </li>
          <li className={activePage === "events" ? "events active" : "events"}>
            <div onClick={() => handleNavigationClick("events")}><i className="fa-regular fa-calendar-check"></i><br />Events</div>
          </li>
          <li className={activePage === "profile" ? "profile active" : "profile"}>
            <div onClick={() => handleNavigationClick("profile")}><i className="fa-solid fa-user"></i><br />Profile</div>
          </li>
        </ul>
      </div>

      <div className="connect">
        <a href="https://github.com/chef4o" id="github"><i className="fa-brands fa-square-github"></i></a>
        <a href="https://www.linkedin.com/in/sihristov" id="lnkdin"><i className="fa-brands fa-linkedin"></i></a>
        <a href="https://www.facebook.com/chef4o" id="fb"><i className="fa-brands fa-square-facebook"></i></a>
        <a href="mailto: sihristov@hotmail.com" id="email"><i className="fa-solid fa-envelope"></i></a>
      </div>
    </div>
  );
}
