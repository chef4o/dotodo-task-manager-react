import { useContext, useEffect, useState } from "react";
import { deleteNote, getAllNotesSorted, getNotesFromStorageOrServer } from "../../services/noteService";
import NoteItem from "./NoteItem";
import EditNoteItem from "./EditNoteItem";
import NoteItemDetails from "./NoteItemDetails";
import NoAccess from "../error/NoAccess";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";
import NoContent from "../error/NoContent";
import EmptyNote from "./EmptyNote";

export default function Notes() {
  const { handleNavigationClick, setLoading } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
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

    const notes = await getAllNotesSorted(user?.id, "startDate", "desc");
    setNotes(notes);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      getNotesFromStorageOrServer(user.id, setNotes);
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="content notes">
      {!user?.id ? (
        <NoAccess onItemClick={handleNavigationClick} />
      ) : (
        <>
          <div className="header-menu">
            <h2>
              <i className="fa-solid fa-note-sticky"></i>Notes
            </h2>
            {!makeNew && (
              <form>
                <button type="submit" className="delete-btn" onClick={() => setMakeNew(true)}>
                  Create new note
                </button>
              </form>
            )}
          </div>

          {notes.length > 0 || makeNew ? (
            <ul className="notes-list">
              {makeNew && <EmptyNote setMakeNew={setMakeNew} setNotes={setNotes}></EmptyNote>}

              {notes.map((item) =>
                editNoteId && editNoteId === item.id ? (
                  <EditNoteItem
                    key={item.id}
                    note={item}
                    editNoteId={editNoteId}
                    activeNoteId={activeNoteId}
                    setEditNoteId={setEditNoteId}
                    setActiveNoteId={setActiveNoteId}
                    deleteNote={deleteNoteHandler}
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
                  />
                ) : null
              )}

              {notes.map(
                (item) =>
                  ((!editNoteId && !activeNoteId) || editNoteId != item.id || activeNoteId != item.id) && (
                    <NoteItem
                      key={item.id}
                      note={item}
                      editNoteId={setEditNoteId}
                      activeNoteId={setActiveNoteId}
                      deleteNote={deleteNoteHandler}
                    />
                  )
              )}
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
