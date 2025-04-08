import * as request from "../api/request";
import { url } from "../api/url";
import { ServiceError } from "./serviceErrorMessages";

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
    console.error(ServiceError.USER_ID_REQUIRED_TO_DELETE);
    return { error: ServiceError.USER_ID_REQUIRED };
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
    console.error(ServiceError.ERROR_VALIDATIONG_NEW_USER, error);
  }
};

export const editUser = async (id, body) => {
  if (!id) {
    console.error(ServiceError.USER_ID_REQUIRED_TO_UPDATE);
    return { error: ServiceError.USER_ID_REQUIRED };
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
        username: ServiceError.USERNAME_EXISTS,
      }));
    }

    if (email.trim() && currentUserExists.emailExists) {
      setValidationErrors((state) => ({
        ...state,
        email: ServiceError.EMAIL_EXISTS,
      }));
    }
  } catch (error) {
    console.error(ServiceError.ERROR_VALIDATIONG_NEW_USER, error);
  }
};
