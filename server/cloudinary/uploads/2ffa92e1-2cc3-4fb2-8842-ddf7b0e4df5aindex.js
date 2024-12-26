const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const router = express.Router()
const cors = require('cors')

app.use(cors())

const url = process.env.MONGO_URL
let connectdb = async (req,res) =>{
    await mongoose.connect(url)
    console.log("database is connected")
}

connectdb()

//! creating schema
const formschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobno: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const FormModel = mongoose.model('Form', formschema)
//! posting the data or creating
let formPost = async (req,res)=>{
    try {
        let payload = await FormModel.create(req.body)

        res
        .status(200)
        .json({
            success: true,
            message: 'post is added',
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

let formGet = async (req,res)=>{
    try {
        let payload = await FormModel.find()

        res
        .status(200)
        .json({
            success: true,
            message: 'data is fetched',
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

let formGetbyid = async (req,res)=>{
    try {
        let payload = await FormModel.find({_id : req.params.id})

        res
        .status(200)
        .json({
            success: true,
            message: 'data is fetched with id',
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

let formDelete = async (req,res)=>{
    try {
        let payload = await FormModel.deleteOne({_id : req.params.id})

        res
        .status(200)
        .json({
            success: true,
            message: 'data is deleted',
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

let formUpdate = async (req,res)=>{
    try {
        let payload = await FormModel.updateOne({_id : req.params.id},{$set: req.body})

        res
        .status(200)
        .json({
            success: true,
            message: 'data is updated',
            payload
        })
    } catch (error) {
        console.log(error)
    }
}


app.use(express.json())
app.use(router)
//! setting up the route
router.post('/form', formPost)
router.get('/form',formGet)
router.get('/form/:id',formGetbyid)
router.delete('/form/:id',formDelete)
router.patch('/form/:id',formUpdate)

port = process.env.PORT

app.listen(port, err =>{
    if(err) throw err
    console.log(`server is started on port ; http://localhost:${port}`)
})