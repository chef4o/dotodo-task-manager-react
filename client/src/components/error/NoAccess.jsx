import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function NoAccess() {
    const { setShowAuthModal } = useContext(AuthContext);
    return (
        <div className="error-page 403">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <h1>403 Access Forbidded</h1>
            <p>{`You cannot access this content \n unless you`}
                <Link className="login" onClick={() => setShowAuthModal({ login: true, register: false })}> log in</Link> or
                <Link className="register" onClick={() => setShowAuthModal({ login: false, register: true })}> register</Link>.
            </p>
        </div>
    )
}