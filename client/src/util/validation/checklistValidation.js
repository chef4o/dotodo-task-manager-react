const FORM_REQUIRED_FIELDS = {
  title: "title",
  elements: "elements",
  element: "element"
};

const FORM_ERROR_FIELDS = {
  title: "title",
  elements: "elements",
  dueDate: "dueDate",
};

const getValidationErrors = (formValues) => {
  const errors = {};

  if (!formValues.title || formValues.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }

  if (!formValues.elements || formValues.elements.length === 0) {
    errors.content = "The checklist must have at least one item";
  }

  if (formValues.dueDate && formValues.dueDate < new Date()) {
    errors.dueDate = "The due date must not be in the past";
  }

  return errors;
};

export const checklistValidation = {
  FORM_REQUIRED_FIELDS,
  FORM_ERROR_FIELDS,
  getValidationErrors,
};
