  const Attendance = require('../models/Attendance');

exports.createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('facultyID')
      .populate('studentID')
      .populate('courseID');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
