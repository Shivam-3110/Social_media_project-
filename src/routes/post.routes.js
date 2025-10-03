
const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/",authMiddleware,createPostController)








module.exports = router ;

