const mongoose = require('mongoose')

const imgSchema = new mongoose.Schema({
    name: { type: String, required: true },
    data: { type: Buffer, required: true }, // Binary data
    contentType: { type: String, required: true } // MIME type (e.g., 'image/jpeg')
})

exports.imgmodel = mongoose.model('Image',imgSchema)