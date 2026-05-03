import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import "../css/GetAllUsers.css";

function Users() {
  // const { userId } = useStore();

  // const [users, setUsers] = useState([]);

  const { token, getAllUsers, users, toggleUserStatus, deleteUser } =
    useStore();

  // const getAllUsers = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:4000/admin/dashboard/getAllUsers`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     console.log(res, "res from backend after hitting getAllUsers");

  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(data, "data from backend after hitting getAllUsers");
  //       alert(data.message);
  //       setUsers(data.users); // Update the users state with the fetched data
  //     }
  //   } catch (error) {
  //     console.error("Error fetching all users:", error);
  //   }
  // };

  useEffect(() => {
    if (token) {
      getAllUsers();
    }
  }, [token]);

  // const toggleUserStatus = async (userId) => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:4000/admin/dashboard/toggle-user-status/${userId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     console.log(res, "res from backend after hitting toggle-user-status");

  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(data, "data from backend after hitting toggle-user-status");
  //       alert(data.message);
  //       getAllUsers(); // Refresh the user list after toggling status
  //     }
  //   } catch (error) {
  //     console.error("Error toggling user status:", error);
  //   }
  // };

  // const deleteUser = async (userId) => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:4000/admin/dashboard/delete-user/${userId}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     console.log(res, "res from backend after hitting delete-user");

  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(data, "data from backend after hitting delete-user");
  //       alert(data.message);
  //       getAllUsers(); // Refresh the user list after deleting a user
  //     }
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  return (
    <>
      <div className="user-management-page">
        <h1 className="page-header">User Management</h1>

        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="user-name-cell">{user.fullName}</td>
                  <td className="user-email-cell">{user.email}</td>
                  <td>
                    <span className={`pill role-pill-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`pill status-pill-${user.isApproved ? "active" : "blocked"}`}
                    >
                      {user.isApproved ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="user-date-cell">2024-01-15</td>
                  <td className="actions-cell">
                    <button
                      className={`action-icon status-toggle ${!user.isApproved ? "is-blocked" : ""}`}
                      onClick={() => toggleUserStatus(user._id)}
                    >
                      {user.isApproved ? "🚫" : "✔️"}
                    </button>
                    <button
                      className="action-icon delete-user"
                      onClick={() => deleteUser(user._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
