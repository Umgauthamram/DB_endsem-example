npm i express mongoose dotenv 

//server.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(express.json());

app.use('/register', authRoutes);
app.use('/appointments', appointmentRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("MongoDB Connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
  });
})
.catch(err => console.error(err));


// routes - auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const { username, email, role } = req.body;

    if (!username || !email || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const user = new User({ username, email, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

//routes - appointments.js

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

// models - Appointments.js

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

//models - User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum:['petOwner','vet']
    // or do in this method
    // enum:{
    //     values: ['petOwner', 'vet'],
    //     message :`{VALUES} is not a valid role`
    // },
    // default:"petOwner"
  }
  
});

module.exports = mongoose.model('User', userSchema);
