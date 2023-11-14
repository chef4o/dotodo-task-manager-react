import { useState } from "react";

export default function Footer() {
  const [activePage, setActivePage] = useState("home");

  const handleNavigationClick = (page) => {
    setActivePage(page);
    window.history.pushState(null, null, `/${page}`);
  };

  return (
    <div className="footer">
      <p>&#169; 2023 DOTODO Task Manager</p>

      <ul>
        <li><div onClick={() => handleNavigationClick("about")}>About</div></li>
        <li><div onClick={() => handleNavigationClick("contact")}>Contact</div></li>
        <li><div onClick={() => handleNavigationClick("blog")}>Blog</div></li>
      </ul>
    </div>
  );
}