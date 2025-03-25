import { deleteChecklist, getAllChecklistsSorted } from "../../services/checklistService";
import Checklist from "./Checklist";
import { useContext, useEffect, useState } from "react";
import NoAccess from "../error/NoAccess";
import NoContent from "../error/NoContent";
import EmptyChecklist from "./EmptyChecklist";
import ChecklistDetails from "./ChecklistDetails";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";
import { getDataFromStorageOrServer } from "../../services/cacheService";

export default function Checklists() {
  const { handleNavigationClick, setLoading, navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const [checklists, setChecklists] = useState([]);
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
    getDataFromStorageOrServer("checklists", () => getAllChecklistsSorted(user.id, "startDate", "desc"), setChecklists);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (user?.id) {
      getDataFromStorageOrServer(
        "checklists",
        () => getAllChecklistsSorted(user.id, "startDate", "desc"),
        setChecklists
      );
    }
    navigate("/checklists");
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (makeNew) {
      setActiveChecklistId("");
      navigate("/checklists/new");
    } else {
      navigate("/checklists");
    }
  }, [makeNew]);

  return (
    <div className="content checklists">
      {!user.id ? (
        <NoAccess onItemClick={handleNavigationClick} />
      ) : (
        <>
          <div className="header-menu">
            <h2>
              <i className="fa-solid fa-list-check"></i>Checklists
            </h2>
            {!makeNew && (
              <button
                className="delete-btn"
                onClick={() => {
                  setMakeNew(true);
                }}>
                Create checklist
              </button>
            )}
          </div>

          {checklists.length > 0 || makeNew ? (
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
            <>
              {!makeNew && (
                <ul className="checklists-list empty">
                  <div className="new-checklist">
                    <NoContent />
                  </div>
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
