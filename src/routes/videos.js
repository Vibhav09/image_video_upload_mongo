const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const connection = require('../db/db');
const VideosSchema = require('../models/videos');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  //Checking video uploaded is valid
  if (!req.file.originalname.match(/\.(mp4|mkv|mov|avi|webm)$/i)) {
    return res.json({ message: 'Enter a valid video' });
  }
  let file = {
    name: req.file.originalname,
    type: req.file.mimetype,
    file: req.file.buffer,
  };
  VideosSchema.create(file);
  res.status(200).json({ message: 'Video uploaded successfully' });
});

router.get('/get/:filename', async (req, res) => {
  let image = await VideosSchema.findOne({ name: req.params.filename }).exec();
  //const readStream = fs.createReadStream('dasf', image.file);
  res.type(image.type).send(image.file);
});

router.delete('/delete/:filename', async (req, res) => {
  let _res = await VideosSchema.deleteOne({ name: req.params.filename });
  res.json({ message: 'Deleted Successfully' });
});

module.exports = router;
