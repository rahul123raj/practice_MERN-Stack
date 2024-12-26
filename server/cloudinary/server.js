const express = require('express')
const app = express()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const mongoose = require('mongoose');

const cors = require('cors')

app.use(cors())

cloudinary.config({ 
    cloud_name: 'di3lmcbcc', 
    api_key: '148132292347518', 
    api_secret: 'jcZ8uzYXySpBGmkdlfbsXLySM34' // Click 'View API Keys' above to copy your API secret
});

const port = 5000
const url = 'mongodb+srv://Rahul:12345@cluster0.n3vir.mongodb.net/practice'

let connectdb = async () =>{
    await mongoose.connect(url)
    console.log('database is connected')
}
connectdb()

let imgurlschema = new mongoose.Schema({
    imgurl:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    }
})

let imgurlmodel = mongoose.model('Image',imgurlschema)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        // console.log(file)
        let randam = uuidv4()
      cb(null, randam+""+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post('/',upload.single('file'), async (req,res)=>{
    // console.log(req.file.path)

        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
     
    //  console.log(uploadResult);
       await fs.unlink(req.file.path, err =>{
        if(err) throw err
        console.log('file is deleted')
       })

    //  console.log(uploadResult.secure_url)
       let {name , place} = req.body 
    //    console.log("body",req.body)
    //    console.log("name",name)
    //    console.log("place",place)
     let payload = await imgurlmodel.create({
        
        imgurl: uploadResult.secure_url,
        name:name,
        place:place
     })
     res
     .status(200)
     .json({
        success: true,
        message: ' image and data is posted',
        payload
     })

})

app.get('/',async (req,res) =>{
    try {
        let payload = await imgurlmodel.find({})

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
})

app.listen(port, err =>{
    if(err) throw err
    console.log(`server is running on http://localhost:${port}`)
})