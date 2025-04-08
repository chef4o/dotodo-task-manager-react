import { deleteChecklist, getAllChecklistsSorted } from "../../services/checklistService";
import { useContext, useEffect, useState } from "react";
import NoAccess from "../error/NoAccess";
import NoContent from "../error/NoContent";
import Checklist from "./Checklist";
import EmptyChecklist from "./EmptyChecklist";
import ChecklistDetails from "./ChecklistDetails";
import NavContext from "../../contexts/navContext.jsx";
import AuthContext from "../../contexts/authContext.jsx";

export default function Checklists() {
  const { loading, setLoading, navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  // Attempt to load cached data from sessionStorage.
  const initialChecklists = sessionStorage.getItem("checklists")
    ? JSON.parse(sessionStorage.getItem("checklists"))
    : [];
  const [checklists, setChecklists] = useState(initialChecklists);
  const [makeNew, setMakeNew] = useState(false);
  const [activeChecklistId, setActiveChecklistId] = useState("");

  const deleteChecklistHandler = async (id) => {
    if (!user || !user.id) {
      console.error("User is not available.");
      return;
    }

    setLoading(true);
    await deleteChecklist(id);
    navigate("/checklists");
    sessionStorage.removeItem("checklists");
    try {
      const data = await getAllChecklistsSorted(user.id, "startDate", "desc");
      sessionStorage.setItem("checklists", JSON.stringify(data));
      setChecklists(data);
    } catch (error) {
      console.error("Error fetching checklists after deletion:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) {
      const storedChecklists = sessionStorage.getItem("checklists");
      if (storedChecklists) {
        // Use cached data first and refresh in the background.
        (async () => {
          try {
            const data = await getAllChecklistsSorted(user.id, "startDate", "desc");
            sessionStorage.setItem("checklists", JSON.stringify(data));
            setChecklists(data);
          } catch (error) {
            console.error("Error refreshing checklists:", error);
          }
        })();
      } else {
        // No cached data: show loading indicator until the data is fetched.
        setLoading(true);
        (async () => {
          try {
            const data = await getAllChecklistsSorted(user.id, "startDate", "desc");
            sessionStorage.setItem("checklists", JSON.stringify(data));
            setChecklists(data);
          } catch (error) {
            console.error("Error fetching checklists:", error);
          } finally {
            setLoading(false);
          }
        })();
      }
    } else {
      setChecklists([]);
    }
  }, [user, setLoading]);

  useEffect(() => {
    if (makeNew) {
      setActiveChecklistId("");
      navigate("/checklists/new");
    } else {
      navigate("/checklists");
    }
  }, [makeNew, navigate]);

  // If the user is not logged in, show NoAccess.
  if (!user?.id) {
    return (
      <div className="content checklists">
        <NoAccess />
      </div>
    );
  }

  return (
    <div className="content checklists">
      <div className="header-menu">
        <h2>
          <i className="fa-solid fa-list-check"></i>Checklists
        </h2>
        {!makeNew && (
          <button
            className="delete-btn"
            onClick={() => {
              setMakeNew(true);
            }}
          >
            Create checklist
          </button>
        )}
      </div>

      {/* Only render underlying content when not loading */}
      {!loading && (
        (checklists.length > 0 || makeNew ? (
          <ul className="checklists-list">
            {makeNew && (
              <EmptyChecklist
                setActiveChecklistId={setActiveChecklistId}
                setMakeNew={setMakeNew}
                setChecklists={setChecklists}
              />
            )}

            {checklists.map((item) =>
              activeChecklistId && activeChecklistId === item.id ? (
                <ChecklistDetails
                  key={item.id}
                  checklist={item}
                  activeChecklistId={activeChecklistId}
                  setChecklists={setChecklists}
                  setActiveChecklistId={setActiveChecklistId}
                  deleteChecklist={deleteChecklistHandler}
                  setMakeNew={setMakeNew}
                  navigate={navigate}
                />
              ) : null
            )}

            {checklists
              .filter((item) => item.id !== activeChecklistId)
              .map((item) => (
                <Checklist
                  key={item.id}
                  checklist={item}
                  activeChecklistId={activeChecklistId}
                  setActiveChecklistId={setActiveChecklistId}
                  setChecklists={setChecklists}
                  deleteChecklist={deleteChecklistHandler}
                  setMakeNew={setMakeNew}
                  navigate={navigate}
                />
              ))}
          </ul>
        ) : (
          !makeNew && (
            <ul className="checklists-list empty">
              <div className="new-checklist">
                <NoContent />
              </div>
            </ul>
          )
        ))
      )}
    </div>
  );
}