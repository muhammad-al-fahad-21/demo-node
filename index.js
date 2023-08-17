const express = require('express')
const genres = require('./route/genre')
const mongoose = require('mongoose')
const config = require('config')

const app = express()
const db = config.get('db')

mongoose.connect(db).then(() => console.log(`connected to ${db}...`)).catch((err) => console.error('not connected to database \n', err))

app.use(express.json());

app.use('/genre', genres)

const server = app.listen(config.get("port"), () => {
  console.log(`Server Running On Port ${config.get("port")}`)
})

module.exports = server