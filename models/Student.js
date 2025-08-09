  const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  studentID: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  studentPassword: { type: String, required: true },
  studentYearSection: { type: String },
  studentProgram: {type: String },
  collegeID: { type: mongoose.Schema.Types.ObjectId, ref: 'College' }
});
module.exports = mongoose.model('Student', studentSchema);