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
    errors.title = "Title must be at least 3 characters long";
  }

  if (!formValues.content || formValues.content.trim().length < 6) {
    errors.content = "Content must be at least 6 characters long";
  }

  if (!formValues.dueDate && formValues.dueTime) {
    errors.dueTime = "You cannot add time without a date";
  }

  if (formValues.dueDate) {
    const dueDateTime = formValues.dueTime
      ? new Date(`${formValues.dueDate}T${formValues.dueTime}`)
      : new Date(formValues.dueDate);
    if (dueDateTime < new Date()) {
      errors.dueDate = "The due date/time must not be in the past";
    }
  }

  return errors;
};

export const noteValidation = {
  FORM_REQUIRED_FIELDS,
  FORM_ERROR_FIELDS,
  getValidationErrors,
};
