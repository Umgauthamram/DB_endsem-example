const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        minLength : [3, " Name must have at least 3 characters"]
    },
    email : {
        type : String ,
        required : [true, "Email is required"],
        match : [/.+@.+\..+/, "Email is not valid"],
        unique : [true, "Email already exists"]
    },
    role : {
        type : String,
        enum : ['carOwner', 'mechanic']
    }
})

module.exports = mongoose.model("User", userSchema)