const mongoose = require('mongoose');
const { Schema } = mongoose;

const VideosSchema = new Schema(
  {
    name: String,
    file: Buffer,
    type: String,
  },
  { timestamps: true, collection: 'videos' }
);
const video = mongoose.model('Vidoes', VideosSchema);
module.exports = video;
