require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());
app.use('/api/v1/blogs', router);

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('DB connection sucessful!'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}`));


