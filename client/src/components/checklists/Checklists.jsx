import { deleteChecklist, getChecklistsFromStorageOrServer } from "../../services/checklistService";
import Checklist from "./Checklist";
import { useContext, useEffect, useState } from "react";
import NoAccess from "../error/NoAccess";
import NoContent from "../error/NoContent";
import EmptyChecklist from "./EmptyChecklist";
import ChecklistDetails from "./ChecklistDetails";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";

export default function Checklists() {
  const { handleNavigationClick, setLoading } = useContext(NavContext);
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
    sessionStorage.removeItem("checklists");
    getChecklistsFromStorageOrServer(user.id, setChecklists);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (user?.id) {
      getChecklistsFromStorageOrServer(user.id, setChecklists);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (makeNew) {
      setActiveChecklistId("");
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
