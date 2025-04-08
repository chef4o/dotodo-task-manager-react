import { ValidationError } from "./validationErrorMessages";

const FORM_REQUIRED_FIELDS = {
  title: "title",
  elements: "elements",
  element: "element",
};

const FORM_ERROR_FIELDS = {
  title: "title",
  elements: "elements",
  dueDate: "dueDate",
};

const getValidationErrors = (formValues) => {
  const errors = {};

  if (!formValues.title || formValues.title.trim().length < 3) {
    errors.title = ValidationError.MIN_TITLE_LENGTH;
  }

  if (!formValues.elements || formValues.elements.length === 0) {
    errors.content = ValidationError.CHECKLIST_NO_ELEMENTS;
  }

  if (formValues.dueDate && formValues.dueDate < new Date()) {
    errors.dueDate = ValidationError.DATE_TIME_IN_PAST;
  }

  return errors;
};

export const checklistValidation = {
  FORM_REQUIRED_FIELDS,
  FORM_ERROR_FIELDS,
  getValidationErrors,
};
