const User = require('./../models/userModel');

exports.getAllUsers = async (_, res) => {
  try {

    const users = await User.find().select('-__v');

    res.status(200).json({
      status: 'success',
      ok: true,
      users: users,
      results: users.length
    });

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.getUserByID = async (req, res) => {
  try {

    const uid = req.params.uid;
    const user = await User.findOne({ userID: uid }).select('-__v');

    res.status(200).json({
      status: 'success',
      ok: true,
      user: user
    });

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.addNewUser = async (req, res) => {
  try {

    await User.create(req.body);

    res.status(201).json({
      status: 'success',
      ok: true,
      ...req.body
    });

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.updateUser = async (req, res) => {
  try {

    const uid = req.params.uid;
    const newUserInfo = req.body;

    const blog = await User.findOneAndUpdate({ userID: uid }, newUserInfo, { new: true });

    res.status(204).json({
      status: 'success',
      ok: true,
      blog: blog
    });

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {

    const id = req.params.id;
    if (!id) throw Error('Enter the ID of the document which you want to delete.');

    await User.findByIdAndDelete(id);

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

