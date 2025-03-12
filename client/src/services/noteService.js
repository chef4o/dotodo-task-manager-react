import * as request from "../api/request";
import { url } from "../api/url";
import { processData } from "../util/dataUtils";

export const getAllNotes = async (userId) => {
  if (!userId) {
    console.error("User ID is required to fetch notes.");
    return { error: "User ID is required." };
  }

  try {
    const response = await request.get(`${url.notes}/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return { error: "Failed to fetch notes." };
  }
};

export const getAllNotesSorted = async (userId, sortKey, sortOrder) => {
  const data = await getAllNotes(userId);

  const sortedNotes = processData({
    data,
    sortKey: sortKey,
    sortOrder: sortOrder,
  });

  return sortedNotes;
};

export const getNoteById = async (noteId) => {
  if (!noteId) {
    console.error("Note ID is required.");
    return { error: "Note ID is required." };
  }

  try {
    const response = await request.get(`${url.note}/${noteId}`);
    return response;
  } catch (error) {
    console.error("Error fetching note:", error);
    return { error: "Failed to fetch note." };
  }
};

export const addNote = async (noteData) => {
  if (!noteData.ownerId || !noteData.title || !noteData.content) {
    console.error("User ID, title and content are required.");
    return { error: "Missing required fields." };
  }

  try {
    const response = await request.post(url.addNote, noteData);
    return response;
  } catch (error) {
    console.error("Error creating note:", error);
    return { error: "Failed to create note." };
  }
};

export const editNote = async (noteId, updatedData) => {
  if (!noteId || !updatedData) {
    console.error("Note ID and update data are required.");
    return { error: "Missing required fields." };
  }

  try {
    const response = await request.put(`${url.editNote}/${noteId}`, updatedData);
    return response;
  } catch (error) {
    console.error("Error updating note:", error);
    return { error: "Failed to update note." };
  }
};

export const deleteNote = async (noteId) => {
  try {
    if (!noteId) {
      console.error("Note ID is required.");
      return { error: "Note ID is required." };
    }

    const response = await request.remove(`${url.deleteNote}/${noteId}`);
    return response;
  } catch (error) {
    console.error("Error deleting note:", error);
    return { error: "Failed to delete note." };
  }
};

export const getSomeNotesByDueDateDesc = async (userId, numberOfEvents) => {
  return null;
};

export const getNotesFromStorageOrServer = async (userId, setNotes) => {
  const cachedNotes = sessionStorage.getItem("notes");

  if (cachedNotes) {
    setNotes(JSON.parse(cachedNotes));
  } else {
    const notes = await getAllNotesSorted(userId, "startDate", "desc");
    setNotes(notes);
    sessionStorage.setItem("notes", JSON.stringify(notes));
  }
};
