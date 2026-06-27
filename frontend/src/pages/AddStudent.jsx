import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", rollNo: "",
    year: "", branch: "", mobile: "", cgpa: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/students", form);
      alert("✅ Student added successfully!");
      navigate("/students");
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Failed to add student"));
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">

        <div className="topbar">
          <div>
            <h1>Add Student ➕</h1>
            <p>Fill in the details to add a new student</p>
          </div>
        </div>

        <div className="form-card">
          <h2>Student Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" placeholder="e.g. Rahul Sharma" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Roll No</label>
                <input name="rollNo" placeholder="e.g. 26CSEA01" onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" placeholder="e.g. rahul@gmail.com" onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Year</label>
                <select name="year" onChange={handleChange} required>
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="form-group">
                <label>Branch</label>
                <select name="branch" onChange={handleChange} required>
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="IT">IT</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Mobile</label>
                <input name="mobile" placeholder="e.g. 9876543210" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>CGPA</label>
                <input name="cgpa" type="number" step="0.1" min="0" max="10" placeholder="e.g. 8.5" onChange={handleChange} required />
              </div>
            </div>
            <div className="form-btns">
              <button type="button" className="btn-cancel" onClick={() => navigate("/students")}>Cancel</button>
              <button type="submit" className="btn-primary">➕ Add Student</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default AddStudent;