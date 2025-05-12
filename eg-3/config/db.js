const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("Mongodb connection successful")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB