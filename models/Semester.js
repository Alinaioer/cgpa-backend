const mongoose = require('mongoose');
const semesterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  semesterNumber: Number,
  sgpa: { type: Number, default: 0 }
});
module.exports = mongoose.model('Semester', semesterSchema);