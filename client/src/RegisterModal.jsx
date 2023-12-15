import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function RegisterModal({
    selectedPageBg,
    hideAuthModal }) {

    const FORM_FIELDS = {
        email: 'email',
        username: 'username',
        password: 'password',
        repass: 'repass'
    }

    const formInitialState = Object.fromEntries(
        Object.keys(FORM_FIELDS).map(key => [key, ''])
    );

    const [formValues, setFormValues] = useState(formInitialState);

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    const [validation, setValidation] = useState(
        Object.fromEntries(
            Object.keys(FORM_FIELDS).map(key => [key, ''])
        )
    );

    const usernameValidation = () => {
        // if (formValues.username)
    }

    const emailInputRef = useRef();

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const resetForm = () => { setFormValues(formInitialState) };

    const submitFormHandler = () => {
        //todo: check if user exists

        const uuid = uuidv4();

        //todo: check if pass and repass match 

        const user = {
            _id: uuid,
            email: formValues.email,
            username: formValues.username,
            password: formValues.password
        };

        //add user to users.js

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
                    </div>

                    <div className={FORM_FIELDS.repass}>
                        <label htmlFor={FORM_FIELDS.repass}>Repeat password</label>
                        <div className="form-input">
                            <i className="fa-solid fa-key" />
                            <input
                                id={FORM_FIELDS.repass}
                                name={FORM_FIELDS.repass}
                                type={FORM_FIELDS.repass}
                                value={formValues.repass}
                                onChange={changeHandler} />
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="button" className="register" onClick={submitFormHandler}>Register</button>
        </form>
    )
}