import * as request from "../api/request";
import { url } from "../api/url";
import { computeDueDaysHours, processData } from "../util/dataUtils";
import { ServiceError } from "./serviceErrorMessages";

export const getAllNotes = async (userId) => {
  if (!userId) {
    console.error(ServiceError.USER_ID_REQUIRED_TO_GET_NOTES);
    return { error: ServiceError.USER_ID_REQUIRED };
  }

  try {
    const response = await request.get(`${url.notes}/${userId}`);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_GETTING_ELEMENT, error);
    return { error: ServiceError.ERROR_GETTING_ELEMENT };
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
    console.error(ServiceError.ELEMENT_ID_REQUIRED);
    return { error: ServiceError.ELEMENT_ID_REQUIRED };
  }

  try {
    const response = await request.get(`${url.notes}/${noteId}`);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_GETTING_ELEMENT, error);
    return { error: ServiceError.ERROR_GETTING_ELEMENT };
  }
};

export const addNote = async (noteData) => {
  if (!noteData.ownerId || !noteData.title || !noteData.content) {
    console.error(ServiceError.USER_TITLE_CONTENT_REQUIRED);
    return { error: ServiceError.MISSING_FIELDS };
  }

  try {
    const response = await request.post(url.addNote, noteData);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_CREATING_ELEMENT, error);
    return { error: ServiceError.ERROR_CREATING_ELEMENT };
  }
};

export const editNote = async (noteId, updatedData) => {
  if (!noteId || !updatedData) {
    console.error(ServiceError.ELEMENT_UPDATE_DATA_REQUIRED);
    return { error: ServiceError.MISSING_FIELDS };
  }

  try {
    const response = await request.put(`${url.editNote}/${noteId}`, updatedData);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_UPDATING_ELEMENT, error);
    return { error: ServiceError.ERROR_UPDATING_ELEMENT };
  }
};

export const deleteNote = async (noteId) => {
  try {
    if (!noteId) {
      console.error(ServiceError.ELEMENT_ID_REQUIRED);
      return { error: ServiceError.ELEMENT_ID_REQUIRED };
    }

    const response = await request.remove(`${url.deleteNote}/${noteId}`);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_DELETING_ELEMENT, error);
    return { error: ServiceError.ERROR_DELETING_ELEMENT };
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
