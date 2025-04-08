import { useContext } from "react";
import { deleteUser } from "../../services/userService";
import { getRoleName } from "../../assets/userRoles";
import NavContext from "../../contexts/navContext.jsx";

export default function AdminUserForm({ currentUser, setUserToEditId }) {
  const { setLoading } = useContext(NavContext);

  async function deleteUserHandler(event) {
    event.preventDefault();

    try {
      setLoading(true);
      await deleteUser(currentUser.id);
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
          <input id="email" type="text" name="email" value={currentUser.email} disabled />
        </div>

        <div className="param">
          <input id="username" type="text" name="username" value={currentUser.username} disabled />
        </div>

        <div className="param-role">
          <input id="role" type="text" name="role" value={getRoleName(currentUser.role)} disabled />
        </div>
      </div>

      <div className="btn-group">
        <button className="admin-form-btn" onClick={() => setUserToEditId(currentUser.id)}>
          Edit
        </button>
        <button
          className="admin-form-btn"
          onClick={(e) => {
            if (window.confirm("Are you sure that you want to delete the marked user?")) {
              deleteUserHandler(e);
            }
          }}>
          Delete
        </button>
      </div>
    </form>
  );
}
