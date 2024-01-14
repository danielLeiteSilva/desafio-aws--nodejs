require('dotenv').config()
//Configs
const port = process.env.PORT || '8080'

//Packages
const express = require('express')
const app = express()

//Modules
const router = require('./src/Router.js')

//Use
app.use(express.json())
app.use(router)

//Listen
app.listen(port, () => console.log(`Connected on port ${port}`))