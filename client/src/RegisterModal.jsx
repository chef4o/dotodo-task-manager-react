import { useEffect, useRef, useState } from "react";
import { formFieldsErrorsHandler, emptyField } from "./controllers/errorController";
import { addUser, userExists } from "./services/userService";
import { getFreeUuid } from "./controllers/userController";

export default function RegisterModal({
    selectedPageBg,
    hideAuthModal,
    setUser }) {

    const FORM_FIELDS = {
        email: 'email',
        username: 'username',
        password: 'password',
        repass: 'repass'
    }

    const formInitialState = Object.fromEntries(Object.keys(FORM_FIELDS).map(key => [key, '']));
    const [formValues, setFormValues] = useState(formInitialState);

    const validationInitialState = Object.fromEntries(Object.keys(FORM_FIELDS).map(key => [key, '']));
    const [validationErrors, setValidationErrors] = useState(validationInitialState);
    const validationIsEmpty = Object.values(validationErrors).every(value => !value);

    const validateRegister = async () => {
        formFieldsErrorsHandler(formInitialState, formValues, setValidationErrors);

        if (formValues.password.trim() && formValues.repass.trim()
            && formValues.password.trim() != formValues.repass.trim()) {
            setValidationErrors(state => ({
                ...state,
                repass: 'The passwords should match'
            }));
        }

        const currentUserExists = await userExists(formValues.username.trim(), formValues.email.trim());

        if (formValues.username.trim() && currentUserExists.withUsername) {
            setValidationErrors(state => ({
                ...state,
                username: 'This username is alreay registered'
            }));
        }

        if (formValues.email.trim() && currentUserExists.withEmail) {
            setValidationErrors(state => ({
                ...state,
                email: 'This email is alreay registered'
            }));
        }
    }

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    const emailInputRef = useRef();

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const submitFormHandler = async () => {
        await validateRegister();

        if (validationIsEmpty) {
            const user = {
                _id: await getFreeUuid([], ''),
                email: formValues.email,
                username: formValues.username,
                password: formValues.password
            };

            await addUser(user);
            hideAuthModal();
            setUser(user);
        }
    }

    return (
        <form method="post" className={`auth-form ${selectedPageBg} register`} action="/register">
            <button className="xmark" onClick={() => hideAuthModal("register")}><i className="fa-solid fa-xmark" /></button>

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
                                onChange={changeHandler} />
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
                                onChange={changeHandler} />
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
                                onChange={changeHandler} />
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
                                onChange={changeHandler} />
                        </div>

                        <div className={`error auth`}>{validationErrors.repass}</div>
                    </div>
                </div>
            </div>

            <button type="button" className="register" onClick={submitFormHandler}>Register</button>
        </form>
    )
}