export default function LoginModal({
    selectedPage,
    hideAuthModal }) {

    return (
        <form method="post" className={`auth-form ${selectedPage} login`} action="/login">
            <button className="xmark" onClick={() => hideAuthModal("login")}><i className="fa-solid fa-xmark" /></button>

            <div className="username">
                <label htmlFor="username">Username/Email</label>
                <div className="form-input">
                    <i className="fa-solid fa-user" />
                    <input id="username" name="username" type="text" />
                </div>
            </div>

            <div className="password">
                <label htmlFor="password">Password</label>
                <div className="form-input">
                    <i className="fa-solid fa-key" />
                    <input id="password" name="password" type="password" />
                </div>
            </div>

            <button className="login">Login</button>
        </form>
    )
}