const mongoose = require('mongoose');
const facultySchema = new mongoose.Schema({
  facultyID: { type: String, required: true, unique: true },
  facultyName: { type: String, required: true },
  facultyPosition: { type: String },
  collegeID: { type: mongoose.Schema.Types.ObjectId, ref: 'College' }
});
module.exports = mongoose.model('Faculty', facultySchema);