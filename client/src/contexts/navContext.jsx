import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { topNav, sideNav, bottomNav, connectNav } from "../assets/navElements.js";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [selectedPageBg, setSelectedPageBg] = useState("home");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigationClick = (page) => {
    if (!topNav.map((item) => item.name).includes(page)) {
      setSelectedPageBg(page);
    }
  };

  return (
    <NavContext.Provider
      value={{
        handleNavigationClick,
        selectedPageBg,
        setLoading,
        navigate,
        topNav,
        sideNav,
        bottomNav,
        connectNav,
      }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContext;
