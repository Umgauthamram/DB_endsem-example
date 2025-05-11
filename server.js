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
