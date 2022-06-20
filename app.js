const express = require('express');
const app = express();
const port = 3000;
const connection = require('./src/db/db');
const imagesRouter = require('./src/routes/images');
const videoRouter = require('./src/routes/videos');
require('dotenv').config();

connection();

app.use('/images', imagesRouter);
app.use('/videos', videoRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
