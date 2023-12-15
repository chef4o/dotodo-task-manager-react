import validator from "validator";
import { validate } from "uuid";
import {
  findUserByEmail,
  findUserById,
  findUserByUsername,
} from "../services/userService";

/*
The getUser function checks the type of the param and acts as follows: 
- when the param is uuid    then searches by _id;
- when the param is email   then searches by email;
- when the param is string  then searches by username; 
- when there is no match    then returns undefined; 
*/
export const getUser = async (param) => {
  const user = validate(param)
    ? findUserById(param)
    : validator.isEmail(param)
    ? findUserByEmail(param)
    : findUserByUsername(param);

  return user;
};

export const isPasswordValid = (user, password) => {
  return user.password === password;
};
