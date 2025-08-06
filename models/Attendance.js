const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
  attendanceID: { type: String, required: true, unique: true },
  facultyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  attendanceDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Attendance', attendanceSchema);