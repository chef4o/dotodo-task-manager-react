import { Link } from "react-router-dom";

export default function NoAccess() {
  return (
    <div className="error-page 403">
      <i className="fa-solid fa-triangle-exclamation"></i>
      <h1>403 Access Forbidded</h1>
      <p>
        {`You don't have sufficient rights to access this page. If you are a good friend of the administrators, please
        discuss this with them via the`}
        <Link to={"/contacts"} className="login">
          {` Contact form.`}
        </Link>
      </p>
    </div>
  );
}
