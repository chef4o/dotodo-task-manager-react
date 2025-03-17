import { useContext, useEffect, useRef, useState } from "react";
import { initialState } from "../../util/validation/commonValidation";
import { loginValidation } from "../../util/validation/loginModalValidation";
import { formUtils } from "../../util/formUtils";
import AuthContext from "../../contexts/authContext";
import NavContext from "../../contexts/navContext";

export default function LoginModal() {
  const { setUser, hideAuthModal } = useContext(AuthContext);
  const { setLoading } = useContext(NavContext);
  const [formValues, setFormValues] = useState(initialState(loginValidation.FORM_FIELDS));
  const [validationErrors, setValidationErrors] = useState(initialState(loginValidation.ERROR_FIELDS));
  const changeHandler = formUtils.handleInputChange(setFormValues, setValidationErrors);

  const usernameInputRef = useRef();
  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  const submitFormHandler = () => {
    loginValidation.validateLogin(setUser, setLoading, hideAuthModal, setValidationErrors, formValues);
  };

  return (
    <form method="post" className={`auth-form login`} action="/login">
      <a className="xmark" onClick={() => hideAuthModal()} role="button">
        <i className="fa-solid fa-xmark" />
      </a>

      <div className="auth-fields">
        <div className={loginValidation.FORM_FIELDS.username}>
          <label htmlFor={loginValidation.FORM_FIELDS.username}>User</label>
          <div className="form-input">
            <i className="fa-solid fa-user" />
            <input
              ref={usernameInputRef}
              id={loginValidation.FORM_FIELDS.username}
              name={loginValidation.FORM_FIELDS.username}
              type="text"
              value={formValues.username}
              autoComplete="off"
              onChange={changeHandler}
              className={validationErrors.username && "error-field"}
            />
          </div>
          {validationErrors.username && (
            <div className={`error auth ${loginValidation.FORM_FIELDS.username}`}>{validationErrors.username}</div>
          )}
        </div>

        <div className={loginValidation.FORM_FIELDS.password}>
          <label htmlFor={loginValidation.FORM_FIELDS.password}>Password</label>
          <div className="form-input">
            <i className="fa-solid fa-key" />
            <input
              id={loginValidation.FORM_FIELDS.password}
              name={loginValidation.FORM_FIELDS.password}
              type="password"
              value={formValues.password}
              onChange={changeHandler}
              autoComplete="off"
              className={validationErrors.password && "error-field"}
            />
          </div>
          {validationErrors.password && (
            <div className={`error auth ${loginValidation.FORM_FIELDS.password}`}>{validationErrors.password}</div>
          )}
        </div>
      </div>

      {validationErrors.login && <div className="error auth login">{validationErrors.login}</div>}

      {/* <div class="rememberMe">
        <input type="checkbox" name="remember-me" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div> */}

      <button type="button" className="login" onClick={() => submitFormHandler()}>
        Login
      </button>
    </form>
  );
}
