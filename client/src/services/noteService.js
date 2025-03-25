import * as request from "../api/request";
import { url } from "../api/url";
import { computeDueDaysHours, processData } from "../util/dataUtils";

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

  if (!Array.isArray(data) || data.length === 0) return [];

  const notesWithAddedDateTime = data.map((note) => {
    if (note.dueDate) {
      note.dueDaysHours = computeDueDaysHours(note.dueDate, note.dueTime);
    }
    return note;
  });

  const sortedNotes = processData({
    data: notesWithAddedDateTime,
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
    const response = await request.get(`${url.notes}/${noteId}`);
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
  const data = await getAllNotes(userId);

  if (!Array.isArray(data) || data.length === 0) return [];

  const notesWithAddedDateTime = data.map((note) => {
    if (note.dueDate) {
      note.dueDaysHours = computeDueDaysHours(note.dueDate, note.dueTime);
    }
    return note;
  });

  const sortedNotes = processData({
    data: notesWithAddedDateTime,
    sortKey: "dueDate",
    sortOrder: "desc",
    filterFn: (note) => !note.archived,
    limit: numberOfEvents,
  });

  return sortedNotes;
};
