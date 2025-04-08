import { isEmail, isMobilePhone } from "validator";
import { ValidationError } from "./validationErrorMessages";

const FORM_REQUIRED_FIELDS = {
  username: "username",
  email: "email",
};

const FORM_ERROR_FIELDS = {
  username: "username",
  email: "email",
  dob: "dob",
  firstName: "firstName",
  lastName: "lastName",
  imageUrl: "imageUrl",
  phoneNumber: "phoneNumber",
  street: "street",
  town: "town",
};

const getValidationErrors = (formValues) => {
  const errors = {};

  if (!formValues.username.trim() || formValues.username.trim().length < 3) {
    errors.username = ValidationError.MIN_USERNAME_LENGTH;
  }

  if (!formValues.email.trim() || !isEmail(formValues.email)) {
    errors.email = ValidationError.INVALID_EMAIL;
  }

  if (formValues.phoneNumber && !isMobilePhone(formValues.phoneNumber)) {
    errors.phoneNumber = ValidationError.INVALID_PHONE_NUM;
  }

  return errors;
};

export const profileValidation = {
  FORM_REQUIRED_FIELDS,
  FORM_ERROR_FIELDS,
  getValidationErrors,
};
