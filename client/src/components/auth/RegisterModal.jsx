import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { formEmptyFieldsHandler } from "../../controllers/errorController";
import { registerAuthUser, validateNewUser } from "../../services/userService";
import { isEmail } from "validator";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";

export default function RegisterModal() {
  const { selectedPageBg } = useContext(NavContext);
  const { setUser, hideAuthModal } = useContext(AuthContext);

  const FORM_FIELDS = {
    email: "email",
    username: "username",
    password: "password",
    repass: "repass",
  };

  const formInitialState = Object.fromEntries(
    Object.keys(FORM_FIELDS).map((key) => [key, ""])
  );
  const [formValues, setFormValues] = useState(formInitialState);

  const validationInitialState = Object.fromEntries(
    Object.keys(FORM_FIELDS).map((key) => [key, ""])
  );
  const [validationErrors, setValidationErrors] = useState(
    validationInitialState
  );
  const validationIsEmpty = Object.values(validationErrors).every(
    (value) => !value
  );

  const [formReadyForSubmit, isFormReadyForSubmit] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validateRegisterFields = () => {
    formEmptyFieldsHandler(
      formInitialState,
      formValues,
      [],
      setValidationErrors
    );
    validateEmail();
    validateUsername();
    validatePassword();
    validatePasswordsMatch();
  };

  const validateEmail = useCallback(() => {
    if (formValues.email && !isEmail(formValues.email.trim())) {
      setValidationErrors((state) => ({
        ...state,
        email: "The email should be valid",
      }));
    } else if (formValues.email) {
      setValidationErrors((state) => ({
        ...state,
        email: "",
      }));
    }
  }, [formValues.email]);

  const validateUsername = useCallback(() => {
    if (formValues.username && formValues.username.trim().length < 3) {
      setValidationErrors((state) => ({
        ...state,
        username: "Minimum length: 3 characters",
      }));
    } else if (formValues.username) {
      setValidationErrors((state) => ({
        ...state,
        username: "",
      }));
    }
  }, [formValues.username]);

  const validatePassword = useCallback(() => {
    if (formValues.password && formValues.password.trim().length < 4) {
      setValidationErrors((state) => ({
        ...state,
        password: "Minimum length: 4 characters",
      }));
    } else if (formValues.password) {
      setValidationErrors((state) => ({
        ...state,
        password: "",
      }));
    }
  }, [formValues.password]);

  const validatePasswordsMatch = useCallback(() => {
    if (
      formValues.password.trim() &&
      formValues.repass.trim() &&
      formValues.password.trim() !== formValues.repass.trim()
    ) {
      setValidationErrors((state) => ({
        ...state,
        repass: "The passwords should match",
      }));
    } else if (formValues.repass) {
      setValidationErrors((state) => ({
        ...state,
        repass: "",
      }));
    }
  }, [formValues.password, formValues.repass]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const focusHandler = (fieldName) => {
    setFocusedField(fieldName);
  };

  useEffect(() => {
    switch (focusedField) {
      case "email":
        validateEmail();
        break;
      case "username":
        validateUsername();
        break;
      case "password":
        validatePassword();
        break;
      case "repass":
        validatePasswordsMatch();
        break;
      default:
        break;
    }

    if (focusedField) {
      setFocusedField(null);
    }
  }, [
    focusedField,
    formValues.email,
    formValues.username,
    formValues.password,
    formValues.repass,
    validateEmail,
    validateUsername,
    validatePassword,
    validatePasswordsMatch,
  ]);

  const emailInputRef = useRef();

  const submitFormHandler = async () => {
    validateRegisterFields();
    await validateNewUser(
      formValues.username.trim(),
      formValues.email.trim(),
      setValidationErrors
    );

    if (validationIsEmpty) {
      isFormReadyForSubmit(true);
    }
  };

  useEffect(() => {
    const attemptAddUser = async () => {
      if (!formReadyForSubmit || !validationIsEmpty) {
        isFormReadyForSubmit(false);
        return;
      }

      try {
        const currentUser = await registerAuthUser(
          formValues.email,
          formValues.username,
          formValues.password
        );

        setUser({
          _id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
        });
        hideAuthModal();
      } catch (error) {
        console.error("Error adding user:", error);
      }

      isFormReadyForSubmit(false);
    };

    attemptAddUser();
  }, [
    formReadyForSubmit,
    validationIsEmpty,
    setUser,
    hideAuthModal,
    formValues,
  ]);

  return (
    <form
      method="post"
      className={`auth-form ${selectedPageBg} register`}
      action="/register">
      <button className="xmark" onClick={() => hideAuthModal("register")}>
        <i className="fa-solid fa-xmark" />
      </button>

      <div className="auth-fields">
        <div className="user-container">
          <div className={FORM_FIELDS.email}>
            <label htmlFor={FORM_FIELDS.email}>Email</label>
            <div className="form-input">
              <i className="fa-solid fa-envelope" />
              <input
                ref={emailInputRef}
                id={FORM_FIELDS.email}
                name={FORM_FIELDS.email}
                type="text"
                value={formValues.email}
                onChange={changeHandler}
                onBlur={() => focusHandler(FORM_FIELDS.email)}
                className={validationErrors.email && "error-field"}
              />
            </div>

            <div className={`error auth`}>{validationErrors.email}</div>
          </div>

          <div className={FORM_FIELDS.username}>
            <label htmlFor={FORM_FIELDS.username}>Username</label>
            <div className="form-input">
              <i className="fa-solid fa-user" />
              <input
                id={FORM_FIELDS.username}
                name={FORM_FIELDS.username}
                type="text"
                value={formValues.username}
                onChange={changeHandler}
                onBlur={() => focusHandler(FORM_FIELDS.username)}
                className={validationErrors.username && "error-field"}
              />
            </div>

            <div className={`error auth`}>{validationErrors.username}</div>
          </div>
        </div>

        <div className="password-container">
          <div className={FORM_FIELDS.password}>
            <label htmlFor={FORM_FIELDS.password}>Password</label>
            <div className="form-input">
              <i className="fa-solid fa-key" />
              <input
                id={FORM_FIELDS.password}
                name={FORM_FIELDS.password}
                type={FORM_FIELDS.password}
                value={formValues.password}
                onChange={changeHandler}
                onBlur={() => focusHandler(FORM_FIELDS.password)}
                className={validationErrors.password && "error-field"}
              />
            </div>

            <div className={`error auth`}>{validationErrors.password}</div>
          </div>

          <div className={FORM_FIELDS.repass}>
            <label htmlFor={FORM_FIELDS.repass}>Repeat password</label>
            <div className="form-input">
              <i className="fa-solid fa-key" />
              <input
                id={FORM_FIELDS.repass}
                name={FORM_FIELDS.repass}
                type={FORM_FIELDS.password}
                value={formValues.repass}
                onChange={changeHandler}
                onBlur={() => focusHandler(FORM_FIELDS.repass)}
                className={validationErrors.repass && "error-field"}
              />
            </div>

            <div className={`error auth`}>{validationErrors.repass}</div>
          </div>
        </div>
      </div>

      <button type="button" className="register" onClick={submitFormHandler}>
        Register
      </button>
    </form>
  );
}
