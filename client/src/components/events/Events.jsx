// import UnderConstruction from "../error/UnderConstruction";
import { useContext, useState } from "react";
import Calendar from "./Calendar";
import NoAccess from "../error/NoAccess";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";

export default function Events() {
  const { handleNavigationClick, setLoading, navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const [makeNew, setMakeNew] = useState(false);

  return (
    <div className="content events">
      {!user?.id ? (
        <NoAccess onItemClick={handleNavigationClick} />
      ) : (
        <>
          <div className="header-menu">
            <h2>
              <i className="fa-regular fa-calendar-check"></i>Events
            </h2>
            {makeNew && (
              <button type="submit" className="delete-btn">
                Create new event
              </button>
            )}
          </div>

          <div className="holidays-info">
            <p id="this-month-holidays"></p>
            <p id="next-month-holidays"></p>
          </div>

          <script src="/js/holidays.js"></script>

          <Calendar />
        </>
      )}
    </div>
  );
}
