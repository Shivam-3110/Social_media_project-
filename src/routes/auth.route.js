
const express = require('express')

const router = express.Router()
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")




router.post('/register',async(req ,res)=>{
    const{username,password} = req.body

    const existingUser = await userModel.findOne({
        username
    })
    if(existingUser){
        return res.status(409).json({
            message:"username  alreadyexist"
        })
    }

    const user = await userModel.create({
        username,password
    })
     const token = jwt.sign({
        id:user._id
     },process.env.JWT_SECRET)

     res.cookie('token',token)


    res.status(201).json({
        message:"user created sucessfully",
        user
    })
})




module.exports = router ;
 