import { isEmail } from "validator";

export const validateRegisterFields = (formValues, setValidationErrors) => {
  const errors = {};

  if (!formValues.email.trim()) {
    errors.email = "Email is required";
  } else if (!isEmail(formValues.email.trim())) {
    errors.email = "The email should be valid";
  }

  if (!formValues.username.trim()) {
    errors.username = "Username is required";
  } else if (formValues.username.trim().length < 3) {
    errors.username = "Minimum length: 3 characters";
  }

  if (!formValues.password.trim()) {
    errors.password = "Password is required";
  } else if (formValues.password.trim().length < 4) {
    errors.password = "Minimum length: 4 characters";
  }

  if (!formValues.repass.trim()) {
    errors.repass = "Please confirm your password";
  } else if (formValues.password.trim() !== formValues.repass.trim()) {
    errors.repass = "The passwords should match";
  }

  setValidationErrors(errors);
  return Object.values(errors).every((value) => !value);
};
