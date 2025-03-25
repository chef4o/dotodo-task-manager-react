import { isEmail, isMobilePhone } from "validator";

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
    errors.title = "Username must be at least 3 characters long";
  }

  if (!formValues.email.trim() || !isEmail(formValues.email)) {
    errors.content = "Email must be valid";
  }

  if (formValues.phoneNumber && !isMobilePhone(formValues.phoneNumber)) {
    errors.content = "Phone number must be valid";
  }

  return errors;
};

export const profileValidation = {
  FORM_REQUIRED_FIELDS,
  FORM_ERROR_FIELDS,
  getValidationErrors,
};
