export default function RegisterModal({ selectedPage, modalName, hideAuthModal }) {
    return (
        <form method="post" className={`auth-form ${selectedPage} ${modalName}`} action="/register">
            <button className="xmark" onClick={() => hideAuthModal("register")}><i className="fa-solid fa-xmark" /></button>

            <div className="user-container">
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <div className="form-input">
                        <i className="fa-solid fa-envelope" />
                        <input id="email" name="email" type="text" />
                    </div>
                </div>

                <div className="username">
                    <label htmlFor="username">Username</label>
                    <div className="form-input">
                        <i className="fa-solid fa-user" />
                        <input id="username" name="username" type="text" />
                    </div>
                </div>
            </div>

            <div className="password-container">
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <div className="form-input">
                        <i className="fa-solid fa-key" />
                        <input id="password" name="password" type="password" />
                    </div>
                </div>

                <div className="repass">
                    <label htmlFor="repass">Repeat password</label>
                    <div className="form-input">
                        <i className="fa-solid fa-key" />
                        <input id="repass" name="repass" type="password" />
                    </div>
                </div>
            </div>

            <button className="register">Register</button>
        </form>
    )
}