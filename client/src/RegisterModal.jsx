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

    const [formReadyForSubmit, isFormReadyForSubmit] = useState(false);

    const validateRegisterFields = () => {
        formFieldsErrorsHandler(formInitialState, formValues, setValidationErrors);

        if (formValues.password.trim() && formValues.repass.trim()
            && formValues.password.trim() != formValues.repass.trim()) {
            setValidationErrors(state => ({
                ...state,
                repass: 'The passwords should match'
            }));
        }
    }

    const validateNewUser = async () => {
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

    const submitFormHandler = async () => {
        validateRegisterFields();
        await validateNewUser();
        isFormReadyForSubmit(true);
    }

    const createUser = async () => {
        return {
            _id: await getFreeUuid([], ''),
            email: formValues.email,
            username: formValues.username,
            password: formValues.password
        };
    }

    const emailInputRef = useRef();

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    useEffect(() => {
        const attemptAddUser = async () => {
            if (formReadyForSubmit && validationIsEmpty) {
                const user = await createUser();

                try {
                    await addUser(user);
                    setUser(user);
                    hideAuthModal();
                } catch (error) {
                    console.error('Error adding user:', error);
                }

                isFormReadyForSubmit(false);
            } else {
                isFormReadyForSubmit(false);
            }
        };

        attemptAddUser();
    }, [validationIsEmpty, formReadyForSubmit, validationErrors, formValues.email, formValues.password, formValues.username, hideAuthModal, setUser]);


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
                                onChange={changeHandler}
                                className={validationErrors.email && "error-field"} />
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
                                className={validationErrors.username && "error-field"} />
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
                                className={validationErrors.password && "error-field"} />
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
                                className={validationErrors.repass && "error-field"} />
                        </div>

                        <div className={`error auth`}>{validationErrors.repass}</div>
                    </div>
                </div>
            </div>

            <button type="button" className="register" onClick={submitFormHandler}>Register</button>
        </form>
    )
}