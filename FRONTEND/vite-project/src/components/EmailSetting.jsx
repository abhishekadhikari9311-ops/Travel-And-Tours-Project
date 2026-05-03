import React, { useState, useEffect } from "react";
import { useStore } from "../store/store";

const EmailSetting = () => {
  const { token } = useStore();

  // UI State management
  const [activeTab, setActiveTab] = useState("list"); // 'list', 'create', or 'update'
  const [emailSettingsList, setEmailSettingsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    smtpHost: "",
    smtpPort: "",
    smtpSecure: false,
    smtpUser: "",
    smtpPass: "",
  });

  // --- API CALLS ---

  const fetchAllSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/get-email-setting`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setEmailSettingsList(data.emailSetting || []);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const isUpdate = activeTab === "update";
    const url = isUpdate
      ? `http://localhost:4000/admin/dashboard/update-email-setting/${selectedId}`
      : `http://localhost:4000/admin/dashboard/create-email-setting`;

    const method = isUpdate ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(isUpdate ? "Setting Updated!" : "Setting Created!");
        resetForm();
        setActiveTab("list");
        fetchAllSettings();
      }
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this setting?"))
      return;
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/delete-email-setting/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        alert("Deleted successfully");
        fetchAllSettings();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const openUpdateForm = (setting) => {
    setSelectedId(setting._id);
    setFormData({
      smtpHost: setting.smtpHost,
      smtpPort: setting.smtpPort,
      smtpSecure: setting.smtpSecure,
      smtpUser: setting.auth?.smtpUser || "",
      smtpPass: setting.auth?.smtpPass || "",
    });
    setActiveTab("update");
  };

  const resetForm = () => {
    setFormData({
      smtpHost: "",
      smtpPort: "",
      smtpSecure: false,
      smtpUser: "",
      smtpPass: "",
    });
    setSelectedId(null);
  };

  useEffect(() => {
    if (token) fetchAllSettings();
  }, [token]);

  return (
    <div className="email-settings-container">
      <style>{`
        .email-settings-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 900px;
          margin: 40px auto;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          overflow: hidden;
          display: flex;
        }
        .sidebar {
          width: 250px;
          background: #2c3e50;
          color: white;
          padding: 20px 0;
        }
        .sidebar h2 {
          padding: 0 20px;
          font-size: 1.2rem;
          margin-bottom: 30px;
        }
        .sidebar button {
          width: 100%;
          padding: 15px 20px;
          background: none;
          border: none;
          color: #bdc3c7;
          text-align: left;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s;
        }
        .sidebar button.active {
          background: #34495e;
          color: white;
          border-left: 4px solid #3498db;
        }
        .main-content {
          flex: 1;
          padding: 30px;
          background: #f9f9f9;
          min-height: 500px;
        }
        .card {
          background: white;
          padding: 20px;
          border-radius: 6px;
          border: 1px solid #ddd;
          margin-bottom: 15px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }
        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group input[type="password"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn-primary {
          background: #3498db;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-primary:hover { background: #2980b9; }
        .btn-danger {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 10px;
        }
        .btn-edit {
          background: #f1c40f;
          color: #333;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .info p { margin: 5px 0; font-size: 0.9rem; color: #555; }
      `}</style>

      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2>Email Dashboard</h2>
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          View Settings
        </button>
        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => {
            setActiveTab("create");
            resetForm();
          }}
        >
          Add New Setting
        </button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {activeTab === "list" && (
          <div>
            <h3>Configuration List</h3>
            {loading ? (
              <p>Loading...</p>
            ) : emailSettingsList.length === 0 ? (
              <p>No settings found.</p>
            ) : (
              emailSettingsList.map((item) => (
                <div key={item._id} className="card setting-item">
                  <div className="info">
                    <strong>{item.smtpHost}</strong>
                    <p>
                      Port: {item.smtpPort} | User: {item.auth?.smtpUser}
                    </p>
                    <p>
                      <small>
                        SSL/TLS: {item.smtpSecure ? "Enabled" : "Disabled"}
                      </small>
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn-edit"
                      onClick={() => openUpdateForm(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {(activeTab === "create" || activeTab === "update") && (
          <div>
            <h3>
              {activeTab === "update"
                ? "Update Setting"
                : "Create New SMTP Setting"}
            </h3>
            <form onSubmit={handleCreateOrUpdate} className="card">
              <div className="form-group">
                <label>SMTP Host</label>
                <input
                  type="text"
                  value={formData.smtpHost}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, smtpHost: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>SMTP Port</label>
                <input
                  type="number"
                  value={formData.smtpPort}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, smtpPort: e.target.value })
                  }
                />
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="secure"
                  checked={formData.smtpSecure}
                  onChange={(e) =>
                    setFormData({ ...formData, smtpSecure: e.target.checked })
                  }
                />
                <label htmlFor="secure">Use Secure Connection (SSL/TLS)</label>
              </div>

              <div className="form-group">
                <label>SMTP User (Email)</label>
                <input
                  type="text"
                  value={formData.smtpUser}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, smtpUser: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>SMTP Password</label>
                <input
                  type="password"
                  value={formData.smtpPass}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, smtpPass: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn-primary">
                {activeTab === "update" ? "Save Changes" : "Save Configuration"}
              </button>
              <button
                type="button"
                style={{
                  marginLeft: "10px",
                  background: "#ccc",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("list")}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSetting;
