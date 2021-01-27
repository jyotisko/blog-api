const Blog = require('./../models/blogModel');

exports.getAllBlogs = async (req, res) => {

  try {
    let queryString = Blog.find().sort('createdAt').select('-__v');

    if (req.query.author) queryString.find({ author: { $regex: req.query.author.toLowerCase(), $options: 'i' } });
    if (req.query.body) queryString.find({ body: { $regex: `^${req.query.body.toLowerCase()}`, $options: 'i' } });
    if (req.query.title) queryString.find({ title: { $regex: `^${req.query.title.toLowerCase()}`, $options: 'i' } });

    const blogs = await queryString;

    res.status(200).json({
      status: 'success',
      ok: true,
      blogs: blogs,
      results: blogs.length
    });

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select('-__v');
    res.status(200).json({
      blog: blog,
      status: 'success',
      ok: true
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.addNewBlog = async (req, res) => {
  try {
    await Blog.create(req.body);
    res.status(201).json({
      ...req.body,
      status: 'success',
      ok: true
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const newBlogDetails = req.body;
    const id = req.params.id;

    const blog = await Blog.findByIdAndUpdate(id, newBlogDetails, { new: true });

    res.status(204).json({
      status: 'success',
      ok: true,
      updatedBlog: blog,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.updateAllAuthor = async (req, res) => {
  try {
    const userID = req.params.uid;
    const newAuthorName = req.body.authorName;
    if (!userID || !newAuthorName) throw new Error('userID/authorName is required for this action to be performed.');

    await Blog.updateMany({ userID: userID }, { author: newAuthorName });

    res.status(204).json({
      status: 'success',
      ok: true,
    });

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.deleteBlogById = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      ok: true
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};
