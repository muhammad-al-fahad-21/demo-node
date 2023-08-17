const express = require('express')
const genres = require('./routes/genre')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DB).then(() => console.log(`connected to ${process.env.DB}...`)).catch((err) => console.error('not connected to database \n', err))

app.use(express.json());

app.use('/genre', genres)

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Running On Port ${process.env.PORT}`)
})

module.exports = server