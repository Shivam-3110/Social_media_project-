
const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
async function registerController (req , res){
    const {username , password} = req.body ;
    const existingUser = await userModel.findOne({
        username
    })
    if(existingUser){
        return res.status(409).json({
            message:"username  alreadyexist"
        })
    }

    const user = await userModel.create({
        username,
        password : await bcrypt.hash(password,10)
    })
     const token = jwt.sign({
        id:user._id
     },process.env.JWT_SECRET)

     res.cookie('token',token)


    res.status(201).json({
        message:"user created sucessfully",
        user
    })
}
async function loginController(req,res){
    const{username, password} = req.body ;
    const user = await userModel.findOne({
        username
    })

    if(!user) {
        return res.status(400).json({message:"user not found"})
    }
    const isPasswordvalid = await bcrypt.compare(password,user.password) ;

    if(!isPasswordvalid){
        return res.status(400).json({message:"Invalid password"});
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
     res.cookie("token", token);
    res.status(200).json({
        message:"user loggrd in successfully",
        user:{
            username:user.username,
            id:user._id
        }
    })
}


module.exports = {
    registerController ,
    loginController
}