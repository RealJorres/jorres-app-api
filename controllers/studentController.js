const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const { studentID } = req.body;
    const check = await Student.findOne({ studentID });
    if (check) return res.status(401).json({ error: 'Student already exists.' });


    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('collegeID');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
