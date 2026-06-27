import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) { console.log(err); }
  };

  const handleDelete = async (rollNo) => {
    if (!window.confirm(`Delete student ${rollNo}?`)) return;
    try {
      await api.delete(`/students/roll/${rollNo}`);
      alert("✅ Student deleted!");
      loadStudents();
    } catch (err) { alert("❌ Failed to delete!"); }
  };

  // Filter students
  const filtered = students.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchBranch = filterBranch ? s.branch === filterBranch : true;
    const matchYear = filterYear ? s.year === parseInt(filterYear) : true;
    return matchSearch && matchBranch && matchYear;
  });

  // Export to Excel
  const exportToExcel = () => {
    const data = filtered.map((s, i) => ({
      "#": i + 1,
      "Roll No": s.rollNo,
      "Name": s.name,
      "Email": s.email,
      "Year": s.year,
      "Branch": s.branch,
      "Mobile": s.mobile,
      "CGPA": s.cgpa,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(30, 27, 75);
    doc.text("Student Management System", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Total Students: ${filtered.length}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 37);

    autoTable(doc, {
      startY: 45,
      head: [["#", "Roll No", "Name", "Email", "Year", "Branch", "Mobile", "CGPA"]],
      body: filtered.map((s, i) => [
        i + 1, s.rollNo, s.name, s.email, s.year, s.branch, s.mobile, s.cgpa
      ]),
      styles: { fontSize: 9, cellPadding: 5 },
      headStyles: {
        fillColor: [30, 27, 75],
        textColor: 255,
        fontStyle: "bold"
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      rowPageBreak: "auto",
    });

    doc.save("students.pdf");
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">

        <div className="topbar">
          <div>
            <h1>Students 👨‍🎓</h1>
            <p>Manage all student records</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn-export-excel" onClick={exportToExcel}>
              📊 Export Excel
            </button>
            <button className="btn-export-pdf" onClick={exportToPDF}>
              📄 Export PDF
            </button>
            <button className="btn-primary" onClick={() => navigate("/add")}>
              ➕ Add Student
            </button>
          </div>
        </div>

        <div className="table-card">
          <div className="table-top">
            <h3>All Students ({filtered.length})</h3>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                className="search-input"
                placeholder="🔍 Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select
                className="search-input"
                style={{ width: "130px" }}
                value={filterBranch}
                onChange={e => setFilterBranch(e.target.value)}
              >
                <option value="">All Branches</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="IT">IT</option>
              </select>
              <select
                className="search-input"
                style={{ width: "120px" }}
                value={filterYear}
                onChange={e => setFilterYear(e.target.value)}
              >
                <option value="">All Years</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Roll No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Year</th>
                <th>Branch</th>
                <th>Mobile</th>
                <th>CGPA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="9" style={{ textAlign: "center", padding: "50px", color: "#aaa" }}>
                  No students found
                </td></tr>
              ) : (
                filtered.map((s, i) => (
                  <tr key={s._id}>
                    <td>{i + 1}</td>
                    <td><b>{s.rollNo}</b></td>
                    <td>👤 {s.name}</td>
                    <td>{s.email}</td>
                    <td>Year {s.year}</td>
                    <td><span className={`badge badge-${s.branch}`}>{s.branch}</span></td>
                    <td>{s.mobile}</td>
                    <td className={s.cgpa >= 8.5 ? "cgpa-high" : s.cgpa >= 7 ? "cgpa-mid" : "cgpa-low"}>
                      {s.cgpa}
                    </td>
                    <td>
                      <button className="btn-edit" onClick={() => navigate(`/edit/${s.rollNo}`)}>✏️ Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(s.rollNo)}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Students;