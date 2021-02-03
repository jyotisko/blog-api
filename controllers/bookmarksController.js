const Bookmarks = require('./../models/bookmarksModel');

exports.getAllBookmarks = async (req, res) => {
  try {

    let queryString;

    if (req.query.userID && !req.query.blogID) queryString = Bookmarks.find({ userID: req.query.userID });
    else if (req.query.userID && req.query.blogID) queryString = Bookmarks.find({ userID: req.query.userID, blogID: req.query.blogID });
    else queryString = Bookmarks.find();

    const bookmarks = await queryString.select('-__v');

    res.status(200).json({
      status: 'success',
      ok: true,
      bookmarks: bookmarks,
      results: bookmarks.length
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.addNewBookmark = async (req, res) => {
  try {

    const bookmark = await Bookmarks.create(req.body);

    res.status(201).json({
      status: 'success',
      ok: true,
      bookmark: bookmark
    });

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      ok: false,
      message: err
    });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {

    const { blogID, userID } = req.query;
    if (!blogID || !userID) throw new Error('blogID and userID are required to delete a bookmark.');

    await Bookmarks.findOneAndDelete({ blogID: blogID, userID: userID });

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
