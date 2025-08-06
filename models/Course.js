const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true },
  courseUnit: { type: Number },
  courseSemester: { type: Number },
  collegeID: { type: mongoose.Schema.Types.ObjectId, ref: 'College' }
});
module.exports = mongoose.model('Course', courseSchema);