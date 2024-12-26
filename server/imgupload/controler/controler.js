const multer = require('multer');
const { imgmodel } = require('../model/imgschema');
//! Set up multer for handling file uploads
const storage = multer.memoryStorage()  //? store in memory
exports.upload = multer({storage})



exports.imgPost = async (req,res) =>{
    try {

        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        console.log(req.file); // Log to check file data

        const { originalname, mimetype, buffer } = req.file;

    // Use create instead of save
    await imgmodel.create({
      name: originalname,
      data: buffer, // Binary data
      contentType: mimetype,
    });
    console.log('file upload successfull')
    res.status(201).send('Image uploaded successfully');
    } catch (error) {
        res.status(500).send(error.message);   
    }
}

exports.imgGet = async (req,res) =>{
    try {
      let payload = await imgmodel.find({})
      res
      .status(200)
      .json({
        success: true,
        message: 'img is fetched',
        payload
      })
    } catch (error) {
        res.status(500).send(error.message);   
    }
}