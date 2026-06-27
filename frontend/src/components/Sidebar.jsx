import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="mobile-topbar">
        <div className="mobile-logo">
          <span>🎓</span>
          <h2>Student <b>MS</b></h2>
        </div>
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <span>🎓</span>
          <h2>Student <b>MS</b></h2>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
            <span>🏠</span> Dashboard
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
            <span>👨‍🎓</span> Students
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
            <span>➕</span> Add Student
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
            <span>👤</span> Profile
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <p style={{ color: "#c4b5fd", fontSize: "13px", marginBottom: "12px" }}>
            👤 {user?.name}
          </p>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;