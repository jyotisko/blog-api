const express = require('express');
const router = express.Router();
const controller = require('./../controllers/bookmarksController');

router.get('/', controller.getAllBookmarks);
router.post('/', controller.addNewBookmark);
router.delete('/', controller.deleteBookmark);
router.delete('/all/:blogID', controller.deleteAllBookmarksBasedOnBlogID);

module.exports = router;