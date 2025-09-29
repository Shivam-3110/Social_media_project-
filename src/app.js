
const express = require('express')
const jwt = require('jsonwebtoken')
const authRoutes = require("./routes/auth.route")

const cookieParser = require("cookie-parser");
const app = express()


app.use(express.json())

app.use('/auth',authRoutes)





module.exports = app 

