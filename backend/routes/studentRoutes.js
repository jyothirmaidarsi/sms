const express = require("express");
const router = express.Router();

const {
  getStudents,
  getStudentById,
  getStudentByRollNo,
  createStudent,
  updateStudent,
  updateStudentByRollNo,
  deleteStudent,
  deleteStudentByRollNo,
} = require("../controllers/studentController");

const protect = require("../middleware/protect");

// GET Routes
router.get("/", protect, getStudents);
router.get("/roll/:rollNo", protect, getStudentByRollNo);
router.get("/:id", protect, getStudentById);

// POST Routes
router.post("/", protect, createStudent);

// PUT Routes
router.put("/roll/:rollNo", protect, updateStudentByRollNo);
router.put("/:id", protect, updateStudent);

// DELETE Routes
router.delete("/roll/:rollNo", protect, deleteStudentByRollNo);
router.delete("/:id", protect, deleteStudent);

module.exports = router;