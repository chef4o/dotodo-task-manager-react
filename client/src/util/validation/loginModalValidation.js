import { formEmptyFieldsHandler, emptyField } from "../../controllers/errorController";
import { getUser } from "../../controllers/userController";
import { createToken } from "../../services/authService";
import { initialState } from "./commonValidation";

const FORM_FIELDS = { username: "username", password: "password" };

const ERROR_FIELDS = { ...FORM_FIELDS, login: "login" };

const validateLogin = async (setUser, hideAuthModal, setValidationErrors, formValues) => {
  formEmptyFieldsHandler(initialState, formValues, ["login"], setValidationErrors);

  if (emptyField(formValues)) return;

  const existingUser = await getUser(formValues.username.trim());

  if (!existingUser.username) {
    setValidationErrors((state) => ({
      ...state,
      login: existingUser.message,
    }));
    return;
  }

  try {
    const loginToken = await createToken(existingUser.email, formValues.password);

    setValidationErrors(initialState);
    hideAuthModal();
    setUser({
      username: existingUser.username,
      firstName: existingUser.firstName,
      email: existingUser.email,
      role: existingUser.role,
    });
  } catch (error) {
      setValidationErrors((state) => ({
        ...state,
        login: error.message,
      }));
  }
};

export const loginValidation = {
  FORM_FIELDS,
  ERROR_FIELDS,
  validateLogin,
};
