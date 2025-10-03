
const express = require('express')
const jwt = require('jsonwebtoken')
const authRoutes = require("./routes/auth.route")
const postRoutes = require("../src/routes/post.routes")
const cookieParser = require("cookie-parser");
const app = express()


app.use(express.json())
app.use(cookieParser());

app.use('/auth',authRoutes)
app.use('/api/post',postRoutes)





module.exports = app 

