import { useContext, useEffect, useRef, useState } from "react";
import { registerAuthUser, validateNewUser } from "../../services/userService";
import { validationIsEmpty, initialState } from "../../util/validation/commonValidation";
import { registerValidation } from "../../util/validation/registerModalValidation";
import { formUtils } from "../../util/formUtils";
import AuthContext from "../../contexts/authContext.jsx";
import NavContext from "../../contexts/navContext.jsx";

export default function RegisterModal() {
  const { setUser, hideAuthModal } = useContext(AuthContext);
  const { setLoading } = useContext(NavContext);

  const [formValues, setFormValues] = useState(() => initialState(registerValidation.FORM_FIELDS));
  const [validationErrors, setValidationErrors] = useState(() => initialState(registerValidation.FORM_FIELDS));
  const [formReadyForSubmit, isFormReadyForSubmit] = useState(false);

  const changeHandler = formUtils.handleInputChange(setFormValues, setValidationErrors);

  const emailInputRef = useRef();

  const submitFormHandler = async () => {
    registerValidation.validateRegisterFields(formValues, setValidationErrors);
    await validateNewUser(formValues.username.trim(), formValues.email.trim(), setValidationErrors);

    if (validationIsEmpty(validationErrors)) {
      isFormReadyForSubmit(true);
    }
  };

  useEffect(() => {
    const attemptAddUser = async () => {
      if (!formReadyForSubmit || !validationIsEmpty(validationErrors)) {
        isFormReadyForSubmit(false);
        return;
      }

      try {
        setLoading(true);

        const currentUser = await registerAuthUser(formValues.email, formValues.username, formValues.password);

        setUser({
          id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
          role: currentUser.role,
        });

        hideAuthModal();
        setLoading(false);
      } catch (error) {
        console.error("Error adding user:", error);
      }

      isFormReadyForSubmit(false);
    };

    attemptAddUser();
  }, [formReadyForSubmit, validationErrors, setUser, hideAuthModal, formValues]);

  return (
    <form
      method="post"
      className={`auth-form register`}
      action="/register"
      onSubmit={(e) => {
        e.preventDefault();
        submitFormHandler();
      }}>
      <a className="xmark" onClick={() => hideAuthModal("register")} role="button" tabIndex="0">
        <i className="fa-solid fa-xmark" />
      </a>

      <div className="auth-fields">
        <div className="user-container">
          <div className={registerValidation.FORM_FIELDS.email}>
            <label htmlFor={registerValidation.FORM_FIELDS.email}>Email</label>
            <div className="form-input">
              <i className="fa-solid fa-envelope" />
              <input
                ref={emailInputRef}
                id={registerValidation.FORM_FIELDS.email}
                name={registerValidation.FORM_FIELDS.email}
                type="text"
                value={formValues.email}
                onChange={changeHandler}
                onBlur={() =>
                  formUtils.focusHandler(registerValidation.validateEmail, setValidationErrors, formValues.email)
                }
                className={validationErrors.email && "error-field"}
              />
            </div>

            <div className={`error auth`}>{validationErrors.email}</div>
          </div>

          <div className={registerValidation.FORM_FIELDS.username}>
            <label htmlFor={registerValidation.FORM_FIELDS.username}>Username</label>
            <div className="form-input">
              <i className="fa-solid fa-user" />
              <input
                id={registerValidation.FORM_FIELDS.username}
                name={registerValidation.FORM_FIELDS.username}
                type="text"
                value={formValues.username}
                onChange={changeHandler}
                onBlur={() =>
                  formUtils.focusHandler(registerValidation.validateUsername, setValidationErrors, formValues.username)
                }
                className={validationErrors.username && "error-field"}
              />
            </div>

            <div className={`error auth`}>{validationErrors.username}</div>
          </div>
        </div>

        <div className="password-container">
          <div className={registerValidation.FORM_FIELDS.password}>
            <label htmlFor={registerValidation.FORM_FIELDS.password}>Password</label>
            <div className="form-input">
              <i className="fa-solid fa-key" />
              <input
                id={registerValidation.FORM_FIELDS.password}
                name={registerValidation.FORM_FIELDS.password}
                type={registerValidation.FORM_FIELDS.password}
                value={formValues.password}
                onChange={changeHandler}
                onBlur={() =>
                  formUtils.focusHandler(registerValidation.validatePassword, setValidationErrors, formValues.password)
                }
                className={validationErrors.password && "error-field"}
              />
            </div>

            <div className={`error auth`}>{validationErrors.password}</div>
          </div>

          <div className={registerValidation.FORM_FIELDS.repass}>
            <label htmlFor={registerValidation.FORM_FIELDS.repass}>Repeat password</label>
            <div className="form-input">
              <i className="fa-solid fa-key" />
              <input
                id={registerValidation.FORM_FIELDS.repass}
                name={registerValidation.FORM_FIELDS.repass}
                type={registerValidation.FORM_FIELDS.password}
                value={formValues.repass}
                onChange={changeHandler}
                onBlur={() =>
                  formUtils.focusHandler(
                    registerValidation.validatePasswordsMatch,
                    setValidationErrors,
                    formValues.password,
                    formValues.repass
                  )
                }
                className={validationErrors.repass && "error-field"}
              />
            </div>

            <div className={`error auth`}>{validationErrors.repass}</div>
          </div>
        </div>
      </div>

      <button type="submit" className="register">
        Register
      </button>
    </form>
  );
}
