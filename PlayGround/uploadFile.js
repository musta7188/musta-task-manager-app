///this npm help you to upload file 
const multer  = require('multer');

///will create a folder with the destination name of 'images' to store the files
const upload = multer({
  dest: 'images',
  ///limits is an object that contain many functions nd properties 
  limits: {
    fileSize: 1000000
  },
  ///filter the type of file that you can send (pdf, jpg)
  fileFilter(req, file, callback) {
      ///user regular expression to find match with the extension we looking for
    if(!file.originalname.match(/\.(doc|docx)$/)){
      return callback(new Error('Please upload a word file'))
    }

    callback(undefined, true)

  }
})
              //// single return the middleware we need to use
              /// upload is the name of the key the method should look for
app.post('/upload', upload.single('upload'), (req, res) =>{
  res.send()
}, (error, req, res, next) =>{
  res.status(400).send({error: error.message})
})