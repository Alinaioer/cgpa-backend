const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  gradingScale: { type: Number, default: 10 } // 10-point scale
});
module.exports = mongoose.model('User', userSchema);