import * as request from "../api/request";
import { url } from "../api/url";

export const getAllUsers = async () => {
  const response = await request.get(url.users);
  return Object.values(response);
};

export const getUsersWithLowerRole = async (currentUserRole) => {
  const users = (await getAllUsers()).filter((user) => user.role < currentUserRole);
  return users;
};

export const findUserById = async (id) => {
  const response = await request.get(`${url.users}/${id}`);
  return response;
};

export const findUserByEmail = async (email) => {
  const response = await request.get(`${url.userByEmail}/${email}`);
  return response;
};

export const findUserByUsername = async (username) => {
  const response = await request.get(`${url.userByUsername}/${username}`);
  return response;
};

export const deleteUser = async (userId) => {
  if (!userId) {
    console.error("User ID is required for deleting a user.");
    return { error: "User ID is required." };
  }

  const response = await request.remove(`${url.deleteUser}/${userId}`);
  return response;
};

export const registerAuthUser = async (email, username, password) => {
  try {
    const response = await request.post(url.register, {
      email,
      username,
      password,
    });

    return response;
  } catch (error) {
    console.error("Error validating new user:", error);
  }
};

export const editUser = async (id, body) => {
  if (!id) {
    console.error("User ID is required for updating a user.");
    return { error: "User ID is required." };
  }

  const response = await request.put(`${url.editUser}/${id}`, body);
  return response;
};

export const validateNewUser = async (username, email, setValidationErrors) => {
  try {
    const currentUserExists = await request.post(url.validateIfExists, {
      username,
      email,
    });

    if (username && currentUserExists.usernameExists) {
      setValidationErrors((state) => ({
        ...state,
        username: "This username is already registered",
      }));
    }

    if (email.trim() && currentUserExists.emailExists) {
      setValidationErrors((state) => ({
        ...state,
        email: "This email is already registered",
      }));
    }
  } catch (error) {
    console.error("Error validating new user:", error);
  }
};
