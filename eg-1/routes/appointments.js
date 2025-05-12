const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const { petName, date, vetId, ownerId } = req.body;

    if (!petName || !date || !vetId || !ownerId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const vet = await User.findById(vetId);
    const owner = await User.findById(ownerId);

    if (!vet || vet.role !== 'vet') return res.status(400).json({ error: 'Invalid vetId' });
    if (!owner || owner.role !== 'petOwner') return res.status(400).json({ error: 'Invalid ownerId' });

    const appointment = new Appointment({ petName, date, vetId, ownerId });
    await appointment.save();

    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
