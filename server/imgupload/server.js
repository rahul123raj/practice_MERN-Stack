const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const port = 5000
const url = 'mongodb+srv://Rahul:12345@cluster0.n3vir.mongodb.net/practice'

mongoose.connect(url)
.then(_=> console.log('database is connected'))
.catch(err => console.log('database connection failed',err))

//! route

const router = require('./routes/imgroute')
app.use('/imgapi',router)

app.listen(port, err =>{
    if(err) throw err
    console.log(`server is running on http://localhost:${port}`)
})