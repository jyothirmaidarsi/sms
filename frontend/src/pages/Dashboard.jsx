import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie,
  Cell, Legend
} from "recharts";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) { console.log(err); }
  };

  const avgCgpa = students.length
    ? (students.reduce((a, s) => a + s.cgpa, 0) / students.length).toFixed(1)
    : 0;
  const topCgpa = students.length ? Math.max(...students.map(s => s.cgpa)) : 0;
  const branches = new Set(students.map(s => s.branch)).size;

  // Branch wise data
  const branchData = [...new Set(students.map(s => s.branch))].map(branch => ({
    name: branch,
    students: students.filter(s => s.branch === branch).length
  }));

  // Year wise data
  const yearData = [1, 2, 3, 4].map(year => ({
    name: `Year ${year}`,
    students: students.filter(s => s.year === year).length
  }));

  // CGPA distribution
  const cgpaData = [
    { name: "9-10", value: students.filter(s => s.cgpa >= 9).length },
    { name: "8-9", value: students.filter(s => s.cgpa >= 8 && s.cgpa < 9).length },
    { name: "7-8", value: students.filter(s => s.cgpa >= 7 && s.cgpa < 8).length },
    { name: "Below 7", value: students.filter(s => s.cgpa < 7).length },
  ];

  const COLORS = ["#667eea", "#764ba2", "#f093fb", "#f5576c"];

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">

        <div className="topbar">
          <div>
            <h1>Dashboard 🏠</h1>
            <p>Welcome back, {user?.name}! 👋</p>
          </div>
          <button className="btn-primary" onClick={() => navigate("/students")}>
            👨‍🎓 View All Students
          </button>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">👨‍🎓</div>
            <div className="stat-info">
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">🏫</div>
            <div className="stat-info">
              <h3>{branches}</h3>
              <p>Branches</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">⭐</div>
            <div className="stat-info">
              <h3>{avgCgpa}</h3>
              <p>Average CGPA</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">🏆</div>
            <div className="stat-info">
              <h3>{topCgpa}</h3>
              <p>Top CGPA</p>
            </div>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "25px" }}>

          {/* Branch Chart */}
          <div className="table-card" style={{ padding: "25px" }}>
            <h3 style={{ color: "#1e1b4b", marginBottom: "20px", fontSize: "16px", fontWeight: "600" }}>
              📊 Students by Branch
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={branchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="students" fill="url(#colorGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Year Chart */}
          <div className="table-card" style={{ padding: "25px" }}>
            <h3 style={{ color: "#1e1b4b", marginBottom: "20px", fontSize: "16px", fontWeight: "600" }}>
              📅 Students by Year
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="students" fill="url(#colorGradient2)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#43e97b" />
                    <stop offset="100%" stopColor="#38f9d7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* CGPA PIE + RECENT TABLE */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>

          {/* CGPA Pie Chart */}
          <div className="table-card" style={{ padding: "25px" }}>
            <h3 style={{ color: "#1e1b4b", marginBottom: "20px", fontSize: "16px", fontWeight: "600" }}>
              🎯 CGPA Distribution
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={cgpaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {cgpaData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Students */}
          <div className="table-card">
            <div className="table-top">
              <h3>Recent Students</h3>
              <button className="btn-primary" onClick={() => navigate("/students")}>
                View All
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Year</th>
                  <th>CGPA</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map(s => (
                  <tr key={s._id}>
                    <td><b>{s.rollNo}</b></td>
                    <td>👤 {s.name}</td>
                    <td><span className={`badge badge-${s.branch}`}>{s.branch}</span></td>
                    <td>Year {s.year}</td>
                    <td className={s.cgpa >= 8.5 ? "cgpa-high" : s.cgpa >= 7 ? "cgpa-mid" : "cgpa-low"}>
                      {s.cgpa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;