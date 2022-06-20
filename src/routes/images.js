const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const connection = require('../db/db');
const ImageSchema = require('../models/images');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  //Checking if image uploaded is valid
  if (!req.file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return res.json({ message: 'Enter a valid image' });
  }

  let file = {
    name: req.file.originalname,
    type: req.file.mimetype,
    file: req.file.buffer,
  };
  ImageSchema.create(file);
  res.status(200).json({ message: 'Uploaded' });
});

router.get('/get/:filename', async (req, res) => {
  let image = await ImageSchema.findOne({ name: req.params.filename }).exec();
  //const readStream = fs.createReadStream('dasf', image.file);
  res.type(image.type).send(image.file);
});

router.delete('/delete/:filename', async (req, res) => {
  let _res = await ImageSchema.deleteOne({ name: req.params.filename });
  res.json({ message: 'Deleted Successfully' });
});

module.exports = router;
