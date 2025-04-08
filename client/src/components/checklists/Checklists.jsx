import { deleteChecklist, getAllChecklistsSorted } from "../../services/checklistService";
import { useContext, useEffect, useState } from "react";
import { getDataFromStorageOrServer } from "../../services/cacheService";
import NoAccess from "../error/NoAccess";
import NoContent from "../error/NoContent";
import Checklist from "./Checklist";
import EmptyChecklist from "./EmptyChecklist";
import ChecklistDetails from "./ChecklistDetails";
import NavContext from "../../contexts/navContext.jsx";
import AuthContext from "../../contexts/authContext.jsx";

export default function Checklists() {
  const { setLoading, navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const initialChecklists = JSON.parse(sessionStorage.getItem("checklists")) || [];
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
    getDataFromStorageOrServer("checklists", () => getAllChecklistsSorted(user.id, "startDate", "desc"), setChecklists);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const fetchChecklists = async () => {
      if (user?.id) {
        await getDataFromStorageOrServer(
          "checklists",
          () => getAllChecklistsSorted(user.id, "startDate", "desc"),
          setChecklists
        );
      }
    };
    fetchChecklists();
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
        <NoAccess />
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
