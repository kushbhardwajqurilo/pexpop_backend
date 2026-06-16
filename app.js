const express = require('express')
const cors = require('cors') 
const entryRoute = require('./src/routes/Authroute')
const managerRoute = require('./src/routes/Manageroute')

const app = express()

app.use(cors())
 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", entryRoute)
app.use("/manager", managerRoute)

module.exports = app;