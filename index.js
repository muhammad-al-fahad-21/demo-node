const express = require('express')
const genres = require('./routes/genre')
const mongoose = require('mongoose')
const config = require("./config/default.json")

const app = express()

mongoose.connect(config.DB).then(() => console.log('connected to mongodb...')).catch((err) => console.error('not connected to database \n', err))

app.use(express.json());

app.use('/genre', genres)

const port = config.PORT || 9001

const server = app.listen(port, () => {
  console.log(`Server Running On Port ${port}`)
})

module.exports = server