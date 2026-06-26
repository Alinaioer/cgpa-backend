const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
  semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' },
  name: String,
  credits: Number,
  gradePoint: Number // e.g. 9, 8, 7...
});
module.exports = mongoose.model('Subject', subjectSchema);