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
    const student = await Student.findOne({studentID : req.params.id});
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.loginStudent = async (req, res) => {
  const { studentID, studentPassword } = req.body;

  try {
    if (!studentID || !studentPassword) {
      return res.status(400).json({ error: 'StudentID and password are required.' });
    }

    // Find the student by ID
    const student = await Student.findOne({ studentID });

    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Compare the stored password
    if (student.studentPassword !== password) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // If you want, you could return only necessary fields here
    return res.status(200).json({
      message: 'Login successful',
      student: {
        id: student._id,
        studentID: student.studentID,
        studentName: student.studentName,
        studentYearSection: student.studentYearSection,
        studentProgram: student.studentProgram,
        collegeID: student.collegeID
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};