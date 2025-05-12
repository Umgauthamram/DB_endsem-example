const express = require('express')
const router = express.Router();
const User = require('../models/User')

router.post('/', async (req,res)=>{
    try{
        const {name, email, role}= req.body
        if(!name || !email || !role){
            return res.status(400).json({error:"all feilds are required"})
        }
        const existing = await User.findOne({email})
        if(existing) return res.status(400).json({error:"email already exists"})

            const user = new User({name,email,role})
            await user.save();
            res.status(201).json({message:"User registered",user})
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

module.exports = router