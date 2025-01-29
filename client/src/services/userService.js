import * as request from "../lib/request";
const baseUrl = "http://localhost:3030/jsonstore/users";

export const getAllUsers = async () => {
  const response = await request.get(baseUrl);

  return Object.values(response);
};

export const findUserById = async (id) => {
  const response = await request.get(`${baseUrl}/${id}`);

  return response;
};

export const findUserByEmail = async (email) => {
  const user = await getAllUsers();
  return user.find((user) => user.email === email);
};

export const findUserByUsername = async (username) => {
  const user = await getAllUsers();

  return user.find((user) => user.username === username);
};

export const deleteUser = async (userId) => {
  const response = await request.remove(`${baseUrl}/${userId}`);

  return response;
};

export const registerAuthUser = async (email, username, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });

    const registeredUser = await response.json();

    return registeredUser;
  } catch (error) {
    console.error("Error validating new user:", error);
  }
};

export const editUser = async (body) => {
  const response = request.put(baseUrl, body);

  return response;
};

export const validateNewUser = async (username, email, setValidationErrors) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/validate-existing-user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
      }),
    });

    const currentUserExists = await response.json();

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