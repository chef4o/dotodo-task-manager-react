import * as request from "../api/request";
import { url } from "../api/url";
import { processData } from "../util/dataUtils";
import { ServiceError } from "./serviceErrorMessages";

export const getAllNews = async () => {
  try {
    const response = await request.get(url.news);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_GETTING_ELEMENT, error);
    return { error: ServiceError.ERROR_GETTING_ELEMENT };
  }
};

export const getAllArticlesSorted = async (sortKey, sortOrder) => {
  const rawData = await getAllNews();

  if (!Array.isArray(rawData) || rawData.length === 0) return [];

  const sortedArticles = processData({
    data: rawData,
    sortKey: sortKey,
    sortOrder: sortOrder,
  });

  return sortedArticles;
};

export const getArticleById = async (articleId) => {
  if (!articleId) {
    console.error(ServiceError.ELEMENT_ID_REQUIRED);
    return { error: ServiceError.ELEMENT_ID_REQUIRED };
  }

  try {
    const response = await request.get(`${url.news}/${articleId}`);
    const sortedComments = processData({
      data: response.comments,
      sortKey: "createdAt",
      sortOrder: "desc",
    });

    response.comments = sortedComments;
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_GETTING_ELEMENT, error);
    return { error: ServiceError.ERROR_GETTING_ELEMENT };
  }
};

export const addArticle = async (articleData) => {
  if (!articleData.ownerId || !articleData.title || !articleData.content) {
    console.error(ServiceError.USER_TITLE_CONTENT_REQUIRED);
    return { error: ServiceError.MISSING_FIELDS };
  }

  try {
    const response = await request.post(url.addArticle, articleData);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_CREATING_ELEMENT, error);
    return { error: ServiceError.ERROR_CREATING_ELEMENT };
  }
};

export const editArticle = async (articleId, updatedData) => {
  if (!articleId || !updatedData) {
    console.error(ServiceError.ELEMENT_UPDATE_DATA_REQUIRED);
    return { error: ServiceError.MISSING_FIELDS };
  }

  try {
    const response = await request.put(`${url.editArticle}/${articleId}`, updatedData);
    return response;
  } catch (error) {
    console.error(ServiceError.ERROR_UPDATING_ELEMENT, error);
    return { error: ServiceError.ERROR_UPDATING_ELEMENT };
  }
};
