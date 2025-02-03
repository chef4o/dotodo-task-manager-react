import { formEmptyFieldsHandler, emptyField } from "../../controllers/errorController";
import { getUser } from "../../controllers/userController";
import { formInitialState } from "./commonValidation";

const FORM_FIELDS = {
  email: "email",
  username: "username",
  password: "password",
  repass: "repass",
};

const ERROR_FIELDS = {
  ...FORM_FIELDS,
  login: "login",
};

const validateLogin = async (setUser, hideAuthModal, validationErrors, setValidationErrors, formValues) => {
  formEmptyFieldsHandler(
    formInitialState,
    formValues,
    ["login"],
    setValidationErrors
  );

  const currentUser = await getUser(formValues.username);

  if (
    currentUser &&
    isPasswordValid(currentUser.password, formValues.password)
  ) {
    setValidationErrors(formInitialState);
    hideAuthModal();
    setUser({
      _id: currentUser._id,
      username: currentUser.username,
      firstName: currentUser.firstName,
      email: currentUser.email,
    });
  } else {
    !emptyField(formValues) &&
      !validationErrors.login &&
      setValidationErrors((state) => ({
        ...state,
        login: "Username or password is wrong",
      }));
  }
};

const isPasswordValid = (userPass, password) => {
  return userPass === password;
};

export const loginValidation = {
  FORM_FIELDS,
  ERROR_FIELDS,
  validateLogin,
  isPasswordValid
};
