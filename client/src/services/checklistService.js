import * as request from "../api/request";
import { url } from "../api/url";
import { processData } from "../util/dataUtils";

export const getAllChecklists = async (userId) => {
  if (!userId) {
    console.error("User ID is required to fetch checklists.");
    return { error: "User ID is required." };
  }

  try {
    const response = await request.get(`${url.checklists}/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching checklists:", error);
    return { error: "Failed to fetch checklists." };
  }
};

export const getAllChecklistsSorted = async (userId, sortKey, sortOrder) => {
  const checklists = await getAllChecklists(userId);

  if (!Array.isArray(checklists) || checklists.length === 0) return [];

  return processData({
    data: checklists,
    sortKey: sortKey,
    sortOrder: sortOrder,
  });
};

export const getChecklistById = async (checklistId) => {
  if (!checklistId) {
    console.error("Checklist ID is required.");
    return { error: "Checklist ID is required." };
  }

  try {
    const response = await request.get(`${url.checklists}/${checklistId}`);
    return response;
  } catch (error) {
    console.error("Error fetching checklist:", error);
    return { error: "Failed to fetch checklist." };
  }
};

export const addChecklist = async (checklistData) => {
  if (!checklistData.ownerId || !checklistData.title || checklistData.elements.length === 0) {
    console.error("User ID, title and elements are required.");
    return { error: "Missing required fields." };
  }

  try {
    const response = await request.post(url.addChecklist, checklistData);
    return response;
  } catch (error) {
    console.error("Error creating checklist:", error);
    return { error: "Failed to create checklist." };
  }
};

export const editChecklist = async (checklistId, updatedData) => {
  if (!checklistId || !updatedData) {
    console.error("Checklist ID and update data are required.");
    return { error: "Missing required fields." };
  }

  try {
    const response = await request.put(`${url.editChecklist}/${checklistId}`, updatedData);
    return response;
  } catch (error) {
    console.error("Error updating checklist:", error);
    return { error: "Failed to update checklist." };
  }
};

export const deleteChecklist = async (checklistId) => {
  try {
    if (!checklistId) {
      console.error("Checklist ID is required.");
      return { error: "Checklist ID is required." };
    }

    const response = await request.remove(`${url.deleteChecklist}/${checklistId}`);
    return response;
  } catch (error) {
    console.error("Error deleting checklist:", error);
    return { error: "Failed to delete checklist." };
  }
};

export const getSomeChecklistsByDueDateDesc = async (userId, numberOfEvents) => {
  const checklists = await getAllChecklists(userId);

  const sortedChecklists = processData({
    data: checklists,
    sortKey: "dueDate",
    sortOrder: "desc",
    filterFn: (checklist) => !checklist.archived,
    limit: numberOfEvents,
  });

  return sortedChecklists;
};
