import { useContext, useState } from "react";
import { profileValidation } from "../../util/validation/profileValidation";
import { initialState, validationIsEmpty } from "../../util/validation/commonValidation";
import { editUser } from "../../services/userService";
import { UserRoles, getPossibleRoles } from "../../assets/userRoles";
import AuthContext from "../../contexts/authContext.jsx";
import NavContext from "../../contexts/navContext.jsx";

export default function AdminEditUserForm({ setUsers, currentUser, setUserToEditId }) {
  const { setLoading } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    email: currentUser.email,
    role: currentUser.role,
    username: currentUser.username,
  });

  const [validationErrors, setValidationErrors] = useState(() => initialState(profileValidation.FORM_ERROR_FIELDS));

  const possibleRoles = getPossibleRoles(user?.role);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    const newValue = name === "role" ? parseInt(value) : value;
    const newValues = { ...formValues, [name]: newValue };
    setFormValues(newValues);

    const errors = profileValidation.getValidationErrors(newValues);
    setValidationErrors(errors);
  };

  async function editProfileHandler(event) {
    event.preventDefault();

    const errors = profileValidation.getValidationErrors(formValues);
    setValidationErrors(errors);

    if (!validationIsEmpty(errors)) {
      return;
    }

    try {
      setLoading(true);
      await editUser(currentUser.id, formValues);

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === currentUser.id ? { ...user, ...formValues } : user))
      );

      setUserToEditId("");
      setLoading(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setLoading(false);
    }
  }

  return (
    <form className="update-form">
      <div className="param-group">
        <div className="param">
          <input id="email" type="text" name="email" value={formValues.email} required onChange={changeHandler} />
        </div>

        <div className="param">
          <input
            id="username"
            type="text"
            name="username"
            value={formValues.username}
            required
            onChange={changeHandler}
          />
        </div>

        <select className="change-roles" name="role" value={formValues.role} required onChange={changeHandler}>
          {possibleRoles.map((item) => (
            <option key={item} value={UserRoles[item]}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="btn-group">
        <button
          className="admin-form-btn"
          onClick={(e) => {
            if (window.confirm("Are you sure that you want to update the marked user?")) {
              editProfileHandler(e);
            }
          }}>
          Update
        </button>
        <button className="admin-form-btn" onClick={() => setUserToEditId("")}>
          Cancel
        </button>
      </div>

      {!validationIsEmpty(validationErrors) && (
        <div className="error new-note error-list">
          {Object.entries(validationErrors).map(([key, error]) =>
            error ? (
              <p className="error" key={key}>
                {error}
              </p>
            ) : null
          )}
        </div>
      )}
    </form>
  );
}
