import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DeleteEmailSettingById() {
  const { token } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteEmailSettingById = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/delete-email-setting/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from deleteEmailSettingById API");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "Data from deleteEmailSettingById API");
        alert("Email setting deleted successfully");

        // Optionally, you can redirect the user to another page after deletion
        navigate("/get-email-setting");
      }
    } catch (error) {
      console.error("Error deleting email setting by ID:", error);
    }
  };

  useEffect(() => {
    if (token) {
      deleteEmailSettingById(id);
    }
  }, [token, id]);

  return <h1>DeleteEmailSettingById</h1>;
}

export default DeleteEmailSettingById;
