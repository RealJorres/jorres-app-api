const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const { studentID, studentName, studentYearSection, studentProgram, collegeID } = req.body;
    const check = await Student.findOne({ studentID });
    if (check) return res.status(401).json({ error: 'Student already exists.' });

    const student = new Student({
      studentID,
      studentName,
      studentPassword: studentID, // default password = studentID
      studentYearSection,
      studentProgram,
      collegeID
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({}, { studentPassword: 0 }).populate('collegeID');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};