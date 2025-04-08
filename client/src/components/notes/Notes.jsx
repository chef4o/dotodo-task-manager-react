import { useContext, useEffect, useState } from "react";
import { deleteNote, getAllNotesSorted } from "../../services/noteService";
import { getDataFromStorageOrServer } from "../../services/cacheService";
import NoteItem from "./NoteItem";
import EditNoteItem from "./EditNoteItem";
import NoteItemDetails from "./NoteItemDetails";
import NoAccess from "../error/NoAccess";
import NoContent from "../error/NoContent";
import EmptyNote from "./EmptyNote";
import NavContext from "../../contexts/navContext.jsx";
import AuthContext from "../../contexts/authContext.jsx";

export default function Notes() {
  const { setLoading, navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const initialNotes = JSON.parse(sessionStorage.getItem("notes")) || [];
  const [notes, setNotes] = useState(initialNotes);
  const [activeNoteId, setActiveNoteId] = useState("");
  const [editNoteId, setEditNoteId] = useState("");
  const [makeNew, setMakeNew] = useState(false);

  const deleteNoteHandler = async (id) => {
    if (!user || !user.id) {
      console.error("User is not available.");
      return;
    }

    setLoading(true);
    await deleteNote(id);
    sessionStorage.removeItem("notes");
    navigate(`/notes`);
    getDataFromStorageOrServer("notes", () => getAllNotesSorted(user.id, "startDate", "desc"), setNotes);
    setLoading(false);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      if (user?.id) {
        await getDataFromStorageOrServer("notes", () => getAllNotesSorted(user.id, "startDate", "desc"), setNotes);
      }
      setLoading(false);
    };
    fetchNotes();
  }, [user]);

  return (
    <div className="content notes">
      {!user?.id ? (
        <NoAccess />
      ) : (
        <>
          <div className="header-menu">
            <h2>
              <i className="fa-solid fa-note-sticky"></i>Notes
            </h2>
            {!makeNew && (
              <form>
                <button
                  type="submit"
                  className="delete-btn"
                  onClick={() => {
                    setActiveNoteId("");
                    setEditNoteId("");
                    setMakeNew(true);
                  }}>
                  Create new note
                </button>
              </form>
            )}
          </div>

          {notes.length > 0 || makeNew ? (
            <ul className="notes-list">
              {makeNew && (
                <EmptyNote
                  setMakeNew={setMakeNew}
                  setEditNoteId={setEditNoteId}
                  setActiveNoteId={setActiveNoteId}
                  setNotes={setNotes}
                />
              )}

              {notes.map((item) =>
                editNoteId && editNoteId === item.id ? (
                  <EditNoteItem
                    key={item.id}
                    note={item}
                    editNoteId={editNoteId}
                    setNotes={setNotes}
                    setEditNoteId={setEditNoteId}
                    setActiveNoteId={setActiveNoteId}
                    deleteNote={deleteNoteHandler}
                    setMakeNew={setMakeNew}
                  />
                ) : null
              )}

              {notes.map((item) =>
                activeNoteId && activeNoteId === item.id ? (
                  <NoteItemDetails
                    key={item.id}
                    note={item}
                    setEditNoteId={setEditNoteId}
                    activeNoteId={activeNoteId}
                    setActiveNoteId={setActiveNoteId}
                    deleteNote={deleteNoteHandler}
                    setMakeNew={setMakeNew}
                  />
                ) : null
              )}

              {notes
                .filter((item) => item.id !== activeNoteId && item.id !== editNoteId)
                .map((item) => (
                  <NoteItem
                    key={item.id}
                    note={item}
                    setActiveNoteId={setActiveNoteId}
                    setEditNoteId={setEditNoteId}
                    deleteNote={deleteNoteHandler}
                    setMakeNew={setMakeNew}
                  />
                ))}
            </ul>
          ) : (
            <>
              {!makeNew && (
                <ul className="notes-list empty">
                  <div className="new-note">
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
