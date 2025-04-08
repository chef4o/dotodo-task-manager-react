import { ValidationError } from "./validationErrorMessages";

const FORM_REQUIRED_FIELDS = {
  title: "title",
  content: "content",
};

const FORM_ERROR_FIELDS = {
  title: "title",
  content: "content",
  dueDate: "dueDate",
  dueTime: "dueTime",
};

const getValidationErrors = (formValues) => {
  const errors = {};

  if (!formValues.title || formValues.title.trim().length < 3) {
    errors.title = ValidationError.MIN_TITLE_LENGTH;
  }

  if (!formValues.content || formValues.content.trim().length < 6) {
    errors.content = ValidationError.MIN_CONTENT_LENGTH;
  }

  if (!formValues.dueDate && formValues.dueTime) {
    errors.dueTime = ValidationError.TIME_WITHOUT_DATE;
  }

  if (formValues.dueDate) {
    const dueDateTime = formValues.dueTime
      ? new Date(`${formValues.dueDate}T${formValues.dueTime}`)
      : new Date(formValues.dueDate);
    if (dueDateTime < new Date()) {
      errors.dueDate = ValidationError.DATE_TIME_IN_PAST;
    }
  }

  return errors;
};

export const noteValidation = {
  FORM_REQUIRED_FIELDS,
  FORM_ERROR_FIELDS,
  getValidationErrors,
};
