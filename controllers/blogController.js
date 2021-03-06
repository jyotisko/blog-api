const ApiFeature = require('../utils/apiFeatures');
const Blog = require('./../models/blogModel');

exports.getAllBlogs = async (req, res) => {

  try {
    const Features = new ApiFeature(req.query, Blog.find()).filter().default().limitFields().paginate();
    const blogs = await Features.queryString;
    const totalResults = await Blog.find();

    res.status(200).json({
      status: 'success',
      ok: true,
      blogs: blogs,
      results: blogs.length,
      totalResults: totalResults.length
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
    if (!userID || !newAuthorName) throw new Error('userID and authorName is required for this action to be performed.');

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
