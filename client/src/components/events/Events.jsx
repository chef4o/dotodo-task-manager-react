import { useContext } from "react";
import Calendar from "./Calendar";
import NoAccess from "../error/NoAccess";
import HolidaysInfo from "./HolidayInfo";
import NavContext from "../../contexts/navContext.jsx";
import AuthContext from "../../contexts/authContext.jsx";

export default function Events() {
  const { handleNavigationClick, navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);

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

            <button type="submit" className="delete-btn" onClick={() => navigate("/under-construction")}>
              Create new event
            </button>
          </div>

          <HolidaysInfo />

          <Calendar />
        </>
      )}
    </div>
  );
}
