import { useContext, useEffect, useRef, useState } from "react";
import { registerAuthUser, validateNewUser } from "../../services/userService";
import { commonValidations } from "../../util/validation/commonValidation";
import { registerValidation } from "../../util/validation/registerModalValidation";
import { formUtils } from "../../util/formUtils";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";

export default function RegisterModal() {
  const { selectedPageBg } = useContext(NavContext);
  const { setUser, hideAuthModal } = useContext(AuthContext);
  const [formValues, setFormValues] = useState(() =>
    commonValidations.initialState(registerValidation.FORM_FIELDS)
  );
  const [validationErrors, setValidationErrors] = useState(() =>
    commonValidations.initialState(registerValidation.FORM_FIELDS)
  );
  const [formReadyForSubmit, isFormReadyForSubmit] = useState(false);
  const validationIsEmpty = Object.values(validationErrors).every((value) => !value);

  const changeHandler = formUtils.handleInputChange(setFormValues, setValidationErrors);

  const emailInputRef = useRef();

  const submitFormHandler = async () => {
    registerValidation.validateRegisterFields(formValues, setValidationErrors);
    await validateNewUser(formValues.username.trim(), formValues.email.trim(), setValidationErrors);

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
        const currentUser = await registerAuthUser(formValues.email, formValues.username, formValues.password);

        setUser({
          _id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
          role: currentUser.role,
        });

        hideAuthModal();
      } catch (error) {
        console.error("Error adding user:", error);
      }

      isFormReadyForSubmit(false);
    };

    attemptAddUser();
  }, [formReadyForSubmit, validationIsEmpty, setUser, hideAuthModal, formValues]);

  return (
    <form method="post" className={`auth-form ${selectedPageBg} register`} action="/register">
      <button className="xmark" onClick={() => hideAuthModal("register")}>
        <i className="fa-solid fa-xmark" />
      </button>

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

      <button type="button" className="register" onClick={submitFormHandler}>
        Register
      </button>
    </form>
  );
}
