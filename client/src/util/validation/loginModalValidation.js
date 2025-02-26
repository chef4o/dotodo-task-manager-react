import { formEmptyFieldsHandler, emptyField } from "../../controllers/errorController";
import { getUser } from "../../controllers/userController";
import { createToken } from "../../services/authService";
import { formInitialState } from "./commonValidation";

const FORM_FIELDS = { email: "email", username: "username", password: "password" };

const ERROR_FIELDS = { ...FORM_FIELDS, login: "login" };

const validateLogin = async (setUser, hideAuthModal, validationErrors, setValidationErrors, formValues) => {
  formEmptyFieldsHandler(formInitialState, formValues, ["login"], setValidationErrors);

  const existingUser = await getUser(formValues.username);

  if (!existingUser) {
    emptyField(formValues) &&
      !validationErrors.login &&
      setValidationErrors((state) => ({
        ...state,
        login: "User does not exist",
      }));
  } else {
    const loginToken = createToken(existingUser.email, formValues.password);

    if (loginToken) {
      setValidationErrors(formInitialState);
      hideAuthModal();
      setUser({
        username: existingUser.username,
        firstName: existingUser.firstName,
        email: existingUser.email,
        role: existingUser.role,
      });
    } else {
      !emptyField(formValues) &&
        !validationErrors.login &&
        setValidationErrors((state) => ({
          ...state,
          login: "Username or password is wrong",
        }));
    }
  }
};

export const loginValidation = {
  FORM_FIELDS,
  ERROR_FIELDS,
  validateLogin,
};
