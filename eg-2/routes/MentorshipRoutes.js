const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mentorship = require('../models/Mentorship');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { topic, date, studentId, mentorId } = req.body;

  if (![studentId, mentorId].every(id => mongoose.Types.ObjectId.isValid(id))) {
    return res.status(400).json({ error: 'Invalid user ID(s)' });
  }

  try {
    const [mentor, student] = await Promise.all([
      User.findById(mentorId),
      User.findById(studentId),
    ]);

    if (!mentor || !student || mentor.role !== 'mentor' || student.role !== 'student') {
      return res.status(400).json({ error: 'Invalid mentor or student' });
    }
    const sessionDate = new Date(date);
    const today = new Date();

    if (sessionDate <= today) return res.status(400).json({ error: 'Date must be in the future' });

    const startOfWeek = new Date(sessionDate.setDate(sessionDate.getDate() - sessionDate.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const existingMentorship = await Mentorship.findOne({
      studentId,
      topic,
      date: { $gte: startOfWeek, $lte: endOfWeek },
    });

    if (existingMentorship) {
      return res.status(400).json({ error: 'Only one mentorship per topic per week is allowed' });
    }
    const mentorship = new Mentorship({ topic, date: sessionDate, mentorId, studentId });
    await mentorship.save();

    res.status(201).json({ message: 'Mentorship scheduled successfully', mentorship });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
