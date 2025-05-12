const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    carName : {type : String,required : [true, "Car name is required"],},
    appointmentDate : {type : Date, required : [true, "Date is required"],},
    mechanicId : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    ownerId : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
})

module.exports = mongoose.model('Booking', bookingSchema)