const express = require('express')
const genres = require('./routes/genre')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DB).then(() => console.log('connected to mongodb...')).catch((err) => console.error('not connected to database \n', err))

app.use(express.json());

app.use('/genre', genres)

const port = process.env.PORT || 9001

const server = app.listen(port, () => {
  console.log(`Server Running On Port ${port}`)
})

module.exports = server