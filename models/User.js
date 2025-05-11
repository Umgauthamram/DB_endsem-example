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
