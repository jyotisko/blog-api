require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const blogRouter = require('./routers/blogRouter');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/users', userRouter);

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('DB connection sucessful!')).catch(err => console.error(err));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}`));


