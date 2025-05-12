require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require("./config/db")

const authRoute = require('./routes/authRoute')
const bookingRoute = require('./routes/bookingRoute')

app.use(express.json())

app.use('/register', authRoute)
app.use('/booking', bookingRoute)

connectDB()

app.listen(2020, () => {
    console.log("Server running in http://localhost:2020")
})