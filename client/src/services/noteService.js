import * as request from "../lib/request";
const baseUrl = "http://localhost:3030/jsonstore/users";

export const getAllNotes = async (userID) => {
  const response = await request.get(`${baseUrl}/${userID}/notes`);

  return Object.values(response);
};
