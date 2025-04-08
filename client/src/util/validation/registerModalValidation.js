import { formEmptyFieldsHandler } from "../../controllers/errorController";
import { isEmail } from "validator";
import { initialState } from "./commonValidation";
import { ValidationError } from "./validationErrorMessages";

const FORM_FIELDS = {
  email: "email",
  username: "username",
  password: "password",
  repass: "repass",
};

const validateRegisterFields = (formValues, setValidationErrors) => {
  formEmptyFieldsHandler(initialState(FORM_FIELDS), formValues, [], setValidationErrors);
  validateEmail(setValidationErrors, formValues.email);
  validateUsername(setValidationErrors, formValues.username);
  validatePassword(setValidationErrors, formValues.password);
  validatePasswordsMatch(setValidationErrors, formValues.password, formValues.repass);
};

const validateEmail = (setValidationErrors, email) => {
  if (email && !isEmail(email.trim())) {
    setValidationErrors((state) => ({
      ...state,
      email: ValidationError.INVALID_EMAIL,
    }));
  } else if (email) {
    setValidationErrors((state) => ({
      ...state,
      email: "",
    }));
  }
};

const validateUsername = (setValidationErrors, username) => {
  if (username && username.trim().length < 3) {
    setValidationErrors((state) => ({
      ...state,
      username: ValidationError.MIN_USERNAME_LENGTH,
    }));
  } else if (username) {
    setValidationErrors((state) => ({
      ...state,
      username: "",
    }));
  }
};

const validatePassword = (setValidationErrors, password) => {
  if (password && password.trim().length < 4) {
    setValidationErrors((state) => ({
      ...state,
      password: ValidationError.MIN_PASSWORD_LENGTH,
    }));
  } else if (password) {
    setValidationErrors((state) => ({
      ...state,
      password: "",
    }));
  }
};

const validatePasswordsMatch = (setValidationErrors, password, repass) => {
  if (password.trim() && repass.trim() && password.trim() !== repass.trim()) {
    setValidationErrors((state) => ({
      ...state,
      repass: ValidationError.PASSWORD_NOT_MATCHING,
    }));
  } else if (repass) {
    setValidationErrors((state) => ({
      ...state,
      repass: "",
    }));
  }
};

export const registerValidation = {
  FORM_FIELDS,
  validateEmail,
  validatePassword,
  validatePasswordsMatch,
  validateRegisterFields,
  validateUsername,
};
