import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function RegisterModal({
    selectedPageBg,
    hideAuthModal }) {

    const emailInputRef = useRef();

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const [emailValue, setEmailValue] = useState('');

    const emailChangeHandler = (e) => {
        setEmailValue(e.target.value);
    }

    const [usernameValue, setUsernameValue] = useState('');

    const usernameChangeHandler = (e) => {
        setUsernameValue(e.target.value);
    }

    const [passwordValue, setPasswordValue] = useState('');

    const passwordChangeHandler = (e) => {
        setPasswordValue(e.target.value);
    }

    const [repassValue, setRepassValue] = useState('');

    const repassChangeHandler = (e) => {
        setRepassValue(e.target.value);
    }

    const submitFormHandler = () => {
        //todo: check if user exists

        const uuid = uuidv4();

        //todo: check if pass and repass match 

        const user = {
            _id: uuid,
            email: emailValue,
            username: usernameValue,
            password: passwordValue
        };

        //add user to users.js

    }

    return (
        <form method="post" className={`auth-form ${selectedPageBg} register`} action="/register">
            <button className="xmark" onClick={() => hideAuthModal("register")}><i className="fa-solid fa-xmark" /></button>

            <div className="user-container">
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <div className="form-input">
                        <i className="fa-solid fa-envelope" />
                        <input
                            ref={emailInputRef}
                            id="email"
                            name="email"
                            type="text"
                            value={emailValue}
                            onChange={emailChangeHandler} />
                    </div>
                </div>

                <div className="username">
                    <label htmlFor="username">Username</label>
                    <div className="form-input">
                        <i className="fa-solid fa-user" />
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={usernameValue}
                            onChange={usernameChangeHandler} />
                    </div>
                </div>
            </div>

            <div className="password-container">
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <div className="form-input">
                        <i className="fa-solid fa-key" />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={passwordValue}
                            onChange={passwordChangeHandler} />
                    </div>
                </div>

                <div className="repass">
                    <label htmlFor="repass">Repeat password</label>
                    <div className="form-input">
                        <i className="fa-solid fa-key" />
                        <input
                            id="repass"
                            name="repass"
                            type="password"
                            value={repassValue}
                            onChange={repassChangeHandler} />
                    </div>
                </div>
            </div>

            <button type="button" className="register" onClick={submitFormHandler}>Register</button>
        </form>
    )
}