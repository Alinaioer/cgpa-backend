const router = require('express').Router();
const Semester = require('../models/Semester');
const Subject = require('../models/Subject');
const auth = require('../middleware/auth');

// Add a semester with subjects, auto-calc SGPA
router.post('/', auth, async (req, res) => {
  const { semesterNumber, subjects } = req.body; // subjects: [{name, credits, gradePoint}]

  let totalCredits = 0, totalPoints = 0;
  subjects.forEach(s => {
    totalCredits += s.credits;
    totalPoints += s.credits * s.gradePoint;
  });
  const sgpa = totalCredits ? (totalPoints / totalCredits) : 0;

  const semester = await Semester.create({
    user: req.user.id, semesterNumber, sgpa
  });

  const subjectDocs = subjects.map(s => ({ ...s, semester: semester._id }));
  await Subject.insertMany(subjectDocs);

  res.json({ semester, sgpa });
});

// Get all semesters + CGPA
router.get('/', auth, async (req, res) => {
  const semesters = await Semester.find({ user: req.user.id }).sort('semesterNumber');
  const subjects = await Subject.find({ semester: { $in: semesters.map(s => s._id) } });

  let totalCredits = 0, totalPoints = 0;
  subjects.forEach(s => {
    totalCredits += s.credits;
    totalPoints += s.credits * s.gradePoint;
  });
  const cgpa = totalCredits ? totalPoints / totalCredits : 0;

  res.json({ semesters, cgpa, totalCredits, totalPoints });
});

// What-if / reverse calculator
router.post('/whatif', auth, async (req, res) => {
  const { completedPoints, completedCredits, remainingCredits, targetCGPA } = req.body;

  const totalCredits = completedCredits + remainingCredits;
  const neededTotalPoints = targetCGPA * totalCredits;
  const neededPoints = neededTotalPoints - completedPoints;
  const neededAvgGP = neededPoints / remainingCredits;

  const achievable = neededAvgGP <= 10 && neededAvgGP >= 0;

  res.json({
    neededAvgGP: Number(neededAvgGP.toFixed(2)),
    achievable
  });
});

module.exports = router;