const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', async (req,res) => {
    const {name, email, role} = req.body
    try {
        if(!name || !email || !role){
            res.status(400).json({error : "Please enter all fields"})
        }
        const user = new User({name, email, role})
        await user.save()
        return res.status(201).json(({message : "User created successfully", UserDetails : user}))
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({error : error.message})
    }
})

module.exports = router