const express = require('express');
const router = express.Router();

var cloudinary = require('cloudinary');
const formData = require('express-form-data');
// const cors = require('cors');

// const CLIENT_ORIGIN = '';
const CLOUD_NAME = 'dhzwo4bpe'; 
const API_KEY = '375245996378411'; 
const API_SECRET = '1zlntUFdQLTHFZQQP3-xJzq519k'; 

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET
  })

  router.use(formData.parse())

  router.post('/image-upload', (req, res) => {

    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
    
    Promise
      .all(promises)
      .then(results => res.json(results))
  })

  module.exports = router