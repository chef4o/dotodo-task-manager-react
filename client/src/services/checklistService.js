import * as request from "../api/request";
import { url } from "../api/url";
import { processData } from "../util/dataUtils";
import { ServiceError } from "./serviceErrorMessages";

export const getAllChecklists = async (userId) => {
  if (!userId) {
    console.error(ServiceError.USER_ID_REQUIRED_TO_GET_ELEMENT);
    return { error: ServiceError.USER_ID_REQUIRED };
  }

  try {
    const response = await request.get(`${url.checklists}/${userId}`);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_GETTING_ELEMENT, error);
    return { error: ServiceError.ERROR_GETTING_ELEMENT };
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
    console.error(ServiceError.ELEMENT_ID_REQUIRED);
    return { error: ServiceError.ELEMENT_ID_REQUIRED };
  }

  try {
    const response = await request.get(`${url.checklists}/${checklistId}`);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_GETTING_ELEMENT, error);
    return { error: ServiceError.ERROR_GETTING_ELEMENT };
  }
};

export const addChecklist = async (checklistData) => {
  if (!checklistData.ownerId || !checklistData.title || checklistData.elements.length === 0) {
    console.error(ServiceError.USER_TITLE_CONTENT_REQUIRED);
    return { error: ServiceError.MISSING_FIELDS };
  }

  try {
    const response = await request.post(url.addChecklist, checklistData);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_CREATING_ELEMENT, error);
    return { error: ServiceError.ERROR_CREATING_ELEMENT };
  }
};

export const editChecklist = async (checklistId, updatedData) => {
  if (!checklistId || !updatedData) {
    console.error(ServiceError.ELEMENT_UPDATE_DATA_REQUIRED);
    return { error: ServiceError.ELEMENT_UPDATE_DATA_REQUIRED };
  }

  try {
    const response = await request.put(`${url.editChecklist}/${checklistId}`, updatedData);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_UPDATING_ELEMENT, error);
    return { error: ServiceError.ERROR_UPDATING_ELEMENT };
  }
};

export const deleteChecklist = async (checklistId) => {
  try {
    if (!checklistId) {
      console.error(ServiceError.ELEMENT_ID_REQUIRED);
      return { error: ServiceError.ELEMENT_ID_REQUIRED };
    }

    const response = await request.remove(`${url.deleteChecklist}/${checklistId}`);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_DELETING_ELEMENT, error);
    return { error: ServiceError.ERROR_DELETING_ELEMENT };
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
