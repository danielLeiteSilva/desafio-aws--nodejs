import dotenv from 'dotenv';
import fs from "fs"

dotenv.config()
//Configs
const port = process.env.PORT

//Packages
import express from 'express'
const app = express()

//Modules
import router from './src/Router.js'

const swaggerUi = require('swagger-ui-express');

const buffer = fs.readFileSync("./swagger-output.json")
const base64 = Buffer.from(buffer).toString()
const toJson = JSON.parse(base64)

//Use
app.use('/api/v1/swagger-ui', swaggerUi.serve, swaggerUi.setup(toJson));
app.use(express.json())
app.use(router)

//Listen
app.listen(port, () => console.log(`Connected on port ${port}`))