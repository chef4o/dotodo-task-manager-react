import * as request from "../api/request";
import { url } from "../api/url";
import { processData } from "../util/dataUtils";

export const getAllNews = async () => {
  try {
    const response = await request.get(url.news);
    return response;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { error: "Failed to fetch articles." };
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
    console.error("Article ID is required.");
    return { error: "Article ID is required." };
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
    console.error("Error fetching article:", error);
    return { error: "Failed to fetch article." };
  }
};

export const addArticle = async (articleData) => {
  if (!articleData.ownerId || !articleData.title || !articleData.content) {
    console.error("User ID, title and content are required.");
    return { error: "Missing required fields." };
  }

  try {
    const response = await request.post(url.addArticle, articleData);
    return response;
  } catch (error) {
    console.error("Error creating article:", error);
    return { error: "Failed to create article." };
  }
};

export const editArticle = async (articleId, updatedData) => {
  if (!articleId || !updatedData) {
    console.error("Article ID and update data are required.");
    return { error: "Missing required fields." };
  }

  try {
    const response = await request.put(`${url.editArticle}/${articleId}`, updatedData);
    return response;
  } catch (error) {
    console.error("Error updating article:", error);
    return { error: "Failed to update article." };
  }
};
