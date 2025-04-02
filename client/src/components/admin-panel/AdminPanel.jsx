import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import NavContext from "../../contexts/navContext";
import NoAccess from "../error/NoAccess";
import AdminUserForm from "../admin-panel/AdminUserForm";
import AdminEditUserForm from "../admin-panel/AdminEditUserForm";
import { getUsersWithLowerRole } from "../../services/userService";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { handleNavigationClick, setLoading } = useContext(NavContext);

  const [users, setUsers] = useState([]);
  const [userToEditId, setUserToEditId] = useState("");

  useEffect(() => {
    setLoading(true);
    if (user?.role >= 4) {
      getUsersWithLowerRole(user.role)
        .then((allUsers) => setUsers(allUsers))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="content admin-panel">
      {!user?.role >= 4 ? (
        <NoAccess onItemClick={handleNavigationClick} />
      ) : (
        <>
          <div className="header-menu">
            <i className="fa-solid fa-screwdriver-wrench"></i>
            <h1>Admin panel</h1>
          </div>

          {users?.length > 0 ? (
            <div className="admin-panel-container">
              <table className="admin-panel-users">
                <thead>
                  <tr className="fields">
                    <th id="header-email">Email</th>
                    <th id="header-username">Username</th>
                    <th id="header-role">Role</th>
                  </tr>
                  <tr className="fill-space"></tr>
                </thead>
              </table>

              {users.map((item) =>
                userToEditId === item.id ? (
                  <AdminEditUserForm key={item.id} setUsers={setUsers} currentUser={item} setUserToEditId={setUserToEditId} />
                ) : (
                  <AdminUserForm key={item.id} currentUser={item} setUserToEditId={setUserToEditId} />
                )
              )}
            </div>
          ) : (
            <div className="no-users">
              <i className="fa-solid fa-screwdriver-wrench"></i>
              <p>No users available for administration.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
