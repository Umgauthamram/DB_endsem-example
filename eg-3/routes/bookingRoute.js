const express = require('express')
const router = express.Router()
const Booking = require("../models/Booking")
const User = require("../models/User")

router.post('/', async (req,res) => {
    const {carName, appointmentDate, mechanicId, ownerId} = req.body

    try {
        if(!carName || !appointmentDate || !mechanicId || !ownerId) {
            return res.status(400).json({message : "All fields are required"})
        }

        if(new Date(appointmentDate) < new Date()){
            return res.status(400).json({message : "Appointment date must be in the future"})
        }

        const mechanic = await User.findById(mechanicId)
        const owner = await User.findById(ownerId)
        if(!mechanic || mechanic.role !== 'mechanic'){
            return res.status(400).json({message : "Invalid mechanic Id"})
        }
        if(!owner || owner.role !== 'carOwner'){
            return res.status(400).json({message : "Invalid owner Id"})
        }

        const booking = new Booking({
            carName,appointmentDate,mechanicId,ownerId
        })

        await booking.save()
        return res.status(201).json({message : "Booking created successfully",BookingDetails : booking})
        
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message : error.message})
    }
})

module.exports = router