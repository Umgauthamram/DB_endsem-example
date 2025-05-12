const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/UserRoutes');
const mentorshipRoutes = require('./routes/MentorshipRoutes');

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use('/register', authRoutes);
app.use('/mentorships', mentorshipRoutes);  

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));
