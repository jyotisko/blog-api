const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getAllBlogs);
router.get('/:id', controller.getBlogById);
router.post('/', controller.addNewBlog);
router.delete('/:id', controller.deleteBlogById);

module.exports = router;
