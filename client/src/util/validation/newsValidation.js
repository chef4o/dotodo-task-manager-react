const FORM_REQUIRED_FIELDS = {
  title: "title",
  content: "content",
};

const getValidationErrors = (formValues) => {
  const errors = {};

  if (!formValues.title || formValues.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }

  if (!formValues.content || formValues.content.trim().length < 6) {
    errors.content = "Content must be at least 6 characters long";
  }

  return errors;
};

export const newsValidation = {
  FORM_REQUIRED_FIELDS,
  getValidationErrors,
};
