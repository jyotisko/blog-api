const Blog = require('./model');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().select('-__v');
    res.status(200).json({
      status: 'success',
      ok: true,
      blogs: blogs
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
