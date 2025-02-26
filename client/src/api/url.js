const baseUrl = "http://localhost:5000";

const users = `${baseUrl}/users`;
const userByEmail = `${baseUrl}/users/email`;
const userByUsername = `${baseUrl}/users/username`;
const register = `${baseUrl}/auth/register`;
const validateIfExists = `${baseUrl}/auth/validate-existing-user`;
const customToken = `${baseUrl}/auth/custom-token`;

export const url = {
    users,
    userByEmail, 
    userByUsername,
    register,
    validateIfExists,
    customToken
}