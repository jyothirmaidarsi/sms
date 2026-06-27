import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    const updatedUser = { ...user, name: form.name, email: form.email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("✅ Profile updated!");
    window.location.reload();
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">

        <div className="topbar">
          <div>
            <h1>Profile 👤</h1>
            <p>Manage your account details</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "25px" }}>

          {/* Profile Card */}
          <div className="table-card" style={{ padding: "35px", textAlign: "center" }}>
            <div style={{
              width: "100px", height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "40px", margin: "0 auto 20px",
              boxShadow: "0 8px 25px rgba(102,126,234,0.4)"
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ color: "#1e1b4b", fontSize: "22px", fontWeight: "700" }}>
              {user?.name}
            </h2>
            <p style={{ color: "#718096", fontSize: "14px", marginTop: "8px" }}>
              {user?.email}
            </p>
            <div style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "25px",
              color: "white",
              fontSize: "13px",
              fontWeight: "600",
              display: "inline-block"
            }}>
              👨‍💼 Administrator
            </div>
          </div>

          {/* Edit Form */}
          <div className="form-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
              <h2 style={{ margin: 0 }}>Account Details</h2>
              {!isEditing && (
                <button className="btn-primary" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            {!isEditing ? (
              /* View Mode */
              <div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>👤 Full Name</div>
                  <div style={styles.infoValue}>{user?.name}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>📧 Email</div>
                  <div style={styles.infoValue}>{user?.email}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>🔑 Role</div>
                  <div style={styles.infoValue}>Administrator</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>🆔 User ID</div>
                  <div style={{ ...styles.infoValue, fontSize: "12px", color: "#aaa" }}>{user?.id}</div>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-btns">
                  <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button className="btn-primary" onClick={handleSave}>
                    💾 Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Stats Card */}
        <div style={{ marginTop: "25px" }}>
          <div className="table-card" style={{ padding: "25px" }}>
            <h3 style={{ color: "#1e1b4b", marginBottom: "20px", fontSize: "16px", fontWeight: "600" }}>
              📊 Account Info
            </h3>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={styles.infoChip}>
                🟢 Account Status: <b>Active</b>
              </div>
              <div style={styles.infoChip}>
                🔐 Authentication: <b>JWT Token</b>
              </div>
              <div style={styles.infoChip}>
                📅 Session: <b>Active</b>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  infoRow: {
    display: "flex",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #f1f5f9",
  },
  infoLabel: {
    width: "150px",
    color: "#718096",
    fontSize: "14px",
    fontWeight: "600",
  },
  infoValue: {
    color: "#2d3748",
    fontSize: "15px",
    fontWeight: "500",
  },
  infoChip: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "10px 18px",
    borderRadius: "25px",
    fontSize: "14px",
    color: "#4a5568",
  }
};

export default Profile;