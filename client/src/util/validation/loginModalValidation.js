import { formEmptyFieldsHandler, emptyField } from "../../controllers/errorController";
import { getUser } from "../../controllers/userController";
import { createToken } from "../../services/authService";
import { initialState } from "./commonValidation";

const FORM_FIELDS = { username: "username", password: "password" };

const ERROR_FIELDS = { ...FORM_FIELDS, login: "login" };

const validateLogin = async (setUser, setLoading, hideAuthModal, setValidationErrors, formValues) => {
  formEmptyFieldsHandler(initialState, formValues, ["login"], setValidationErrors);

  if (emptyField(formValues)) return;

  setLoading(true);

  const existingUser = await getUser(formValues.username.trim());

  if (!existingUser.username) {
    setValidationErrors((state) => ({
      ...state,
      login: existingUser.message,
    }));

    setLoading(false);
    return;
  }

  try {
    await createToken(existingUser.email, formValues.password);

    setValidationErrors(initialState);
    hideAuthModal();
    setUser({
      id: existingUser.id,
      username: existingUser.username,
      firstName: existingUser.firstName,
      email: existingUser.email,
      role: existingUser.role,
    });

    setLoading(false);
  } catch (error) {
    setValidationErrors((state) => ({
      ...state,
      login: error.message,
    }));

    setLoading(false);
  }
};

export const loginValidation = {
  FORM_FIELDS,
  ERROR_FIELDS,
  validateLogin,
};
