const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema(
  {
    name: String,
    file: Buffer,
    type: String,
  },
  { timestamps: true, collection: 'photos' }
);
const image = mongoose.model('Image', ImageSchema);
module.exports = image;
