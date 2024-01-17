import dotenv from 'dotenv';
dotenv.config()
//Configs
const port = process.env.PORT

//Packages
import express from 'express'
const app = express()

//Modules
import router from './src/Router.js'

//Use
app.use(express.json())
app.use(router)

//Listen
app.listen(port, () => console.log(`Connected on port ${port}`))