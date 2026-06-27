import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function EditStudent() {
  const { rollNo } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", year: "", branch: "", mobile: "", cgpa: ""
  });

  useEffect(() => { loadStudent(); }, []);

  const loadStudent = async () => {
    try {
      const res = await api.get(`/students/roll/${rollNo}`);
      const s = res.data;
      setForm({
        name: s.name, email: s.email,
        year: s.year, branch: s.branch,
        mobile: s.mobile, cgpa: s.cgpa
      });
    } catch (err) { alert("❌ Student not found!"); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/students/roll/${rollNo}`, form);
      alert("✅ Student updated successfully!");
      navigate("/students");
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Failed to update"));
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">

        <div className="topbar">
          <div>
            <h1>Edit Student ✏️</h1>
            <p>Update details for {rollNo}</p>
          </div>
        </div>

        <div className="form-card">
          <h2>Edit Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Roll No</label>
                <input value={rollNo} disabled style={{ background: "#f5f5f5" }} />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Year</label>
                <select name="year" value={form.year} onChange={handleChange} required>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="form-group">
                <label>Branch</label>
                <select name="branch" value={form.branch} onChange={handleChange} required>
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
                <input name="mobile" value={form.mobile} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>CGPA</label>
                <input name="cgpa" type="number" step="0.1" min="0" max="10" value={form.cgpa} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-btns">
              <button type="button" className="btn-cancel" onClick={() => navigate("/students")}>Cancel</button>
              <button type="submit" className="btn-primary">✏️ Update Student</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default EditStudent;