import { formEmptyFieldsHandler } from "../../controllers/errorController";
import { initialState } from "./commonValidation";

const FORM_ERROR_FIELDS = {
  title: "title",
  content: "content",
};

const validateNoteFields = (formValues, setValidationErrors) => {
  formEmptyFieldsHandler(initialState(FORM_ERROR_FIELDS), formValues, [], setValidationErrors);
  validateTitle(setValidationErrors, formValues.title);
  validateContent(setValidationErrors, formValues.content);
};

const validateTitle = (setValidationErrors, title) => {
  if (title && title.trim().length < 3) {
    setValidationErrors((state) => ({
      ...state,
      title: "Title must be at least 3 characters long",
    }));
  } else if (title) {
    setValidationErrors((state) => ({
      ...state,
      title: "",
    }));
  }
};

const validateContent = (setValidationErrors, content) => {
  if (content && content.trim().length < 6) {
    setValidationErrors((state) => ({
      ...state,
      content: "Content must be at least 6 characters long",
    }));
  } else if (content) {
    setValidationErrors((state) => ({
      ...state,
      content: "",
    }));
  }
};

export const noteValidation = {
  FORM_ERROR_FIELDS,
  validateContent,
  validateTitle,
  validateNoteFields,
};
