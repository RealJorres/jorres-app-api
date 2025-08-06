const mongoose = require('mongoose');
const collegeSchema = new mongoose.Schema({
  collegeName: { type: String, required: true , unique: true },
  collegeAbbr: { type: String, required: true , unique: true }
});
module.exports = mongoose.model('College', collegeSchema);