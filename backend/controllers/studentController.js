const Student = require("../models/studentModel");

// GET all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// GET student by Roll No
const getStudentByRollNo = async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student)
      return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// POST create student
const createStudent = async (req, res) => {
  try {
    const { name, email, rollNo, year, mobile, branch, cgpa } = req.body;
    const student = new Student({ name, email, rollNo, year, mobile, branch, cgpa });
    await student.save();
    res.status(201).json({ message: "Student created", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message }); // ← change error to error.message
  }
};

// PUT update student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student)
      return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student updated", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student)
      return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// PUT update by rollNo
const updateStudentByRollNo = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true, runValidators: true }
    );
    if (!student)
      return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student updated", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// DELETE by rollNo
const deleteStudentByRollNo = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    if (!student)
      return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  getStudents,
  getStudentById,
  getStudentByRollNo,
  createStudent,
  updateStudent,
  updateStudentByRollNo,
  deleteStudent,
  deleteStudentByRollNo,  // ← add this
};