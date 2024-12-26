const {Router} = require('express')
const { imgPost, upload, imgGet } = require('../controler/controler')

const router = Router()

router.post('/imgupload',upload.single('file'),imgPost)
router.get('/imgupload',imgGet)

module.exports = router