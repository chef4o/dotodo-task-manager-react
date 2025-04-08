import { ValidationError } from "./validationErrorMessages";

const FORM_REQUIRED_FIELDS = {
  title: "title",
  content: "content",
};

const getValidationErrors = (formValues) => {
  const errors = {};

  if (!formValues.title || formValues.title.trim().length < 3) {
    errors.title = ValidationError.MIN_TITLE_LENGTH;
  }

  if (!formValues.content || formValues.content.trim().length < 6) {
    errors.content = ValidationError.MIN_CONTENT_LENGTH;
  }

  return errors;
};

export const newsValidation = {
  FORM_REQUIRED_FIELDS,
  getValidationErrors,
};
