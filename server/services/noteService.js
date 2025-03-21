import { db } from "../configuration/firebaseConfig.js";
import { dbTables } from "../configuration/firebaseDb.js";

export const findAllNotesByUser = async (userId) => {
  if (!userId) return null;

  const notesRef = db.collection(dbTables.NOTES.tableName);
  const snapshot = await notesRef.where(dbTables.NOTES.fields.ownerId, "==", userId).get();

  return snapshot.empty
    ? null
    : snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
};

export const findNoteById = async (id) => {
  if (!id) return null;

  const noteDoc = await db.collection(dbTables.NOTES.tableName).doc(id).get();

  return !noteDoc.exists ? null : noteDoc.data();
};

export const deleteNoteById = async (id) => {
  const noteDoc = db.collection(dbTables.NOTES.tableName).doc(id);

  const note = await noteDoc.get();

  if (!note.exists) {
    return null;
  }

  await noteDoc.delete();
  return note;
};

export const editNoteById = async (id, updatedData) => {
  if (!id || !updatedData) return null;

  const noteDoc = db.collection(dbTables.NOTES.tableName).doc(id);
  const note = await noteDoc.get();

  if (!note.exists) {
    return null;
  }

  await noteDoc.update(updatedData);
  return { id, ...updatedData };
};

export const addNote = async (noteData) => {
  if (!noteData.ownerId || !noteData.title || !noteData.content) {
    throw new Error("Owner, title and content are required.");
  }

  const notesRef = db.collection(dbTables.NOTES.tableName);
  const newNote = {
    title: noteData.title || "",
    content: noteData.content || "",
    startDate: new Date().toISOString(),
    completedOn: "",
    dueDate: noteData.dueDate || "",
    dueDateOnly: (noteData.dueDate && !noteData.dueTime) || "",
    dueTime: noteData.dueTime || "",
    ownerId: noteData.ownerId,
    trackProgress: "New",
    archived: false,
    peers: []
  };

  const docRef = await notesRef.add(newNote);
  return { id: docRef.id, ...newNote };
};
