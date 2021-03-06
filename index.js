require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION 💥: Shutting down.');
  process.exit(1);
});

const globalErrorHandler = require('./controllers/errorController');
const blogRouter = require('./routers/blogRouter');
const userRouter = require('./routers/userRouter');
const bookmarksRouter = require('./routers/bookmarksRoutes');
const emailRouter = require('./routers/emailRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookmarks', bookmarksRouter);
app.use('/api/v1/email', emailRouter);

app.all('*', (req, _, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  next(err);
});

app.use(globalErrorHandler);

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('DB connection sucessful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`App running on port ${port}`));

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 💥: Shutting down.');
  server.close(() => process.exit(1));
});
