const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  vetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
