const mongoose = require('mongoose')

const mentorshipSchema = new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    mentorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports = mongoose.model('Mentorship', mentorshipSchema)