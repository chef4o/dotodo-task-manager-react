import { useState } from "react";
import { getUser, validatePassword } from "./controllers/userController";

export default function LoginModal({
    selectedPageBg,
    hideAuthModal }) {

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    const submitFormHandler = async () => {

        const user = await getUser(formValues.username);
        validatePassword(user, formValues.password);

        //todo: pass user to app 
        console.log(user)
    }

    return (
        <form method="post" className={`auth-form ${selectedPageBg} login`} action="/login">
            <button className="xmark" onClick={() => hideAuthModal("login")}><i className="fa-solid fa-xmark" /></button>

            <div className="username">
                <label htmlFor="username">Username/Email</label>
                <div className="form-input">
                    <i className="fa-solid fa-user" />
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formValues.username}
                        onChange={changeHandler} />
                </div>
            </div>

            <div className="password">
                <label htmlFor="password">Password</label>
                <div className="form-input">
                    <i className="fa-solid fa-key" />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={changeHandler} />
                </div>
            </div>

            <button type="button" className="login" onClick={submitFormHandler}>Login</button>
        </form>
    )
}