const express = require('express');
const router = express.Router();
const controller = require('./../controllers/blogController');

router.get('/', controller.getAllBlogs);
router.get('/:id', controller.getBlogById);
router.post('/', controller.addNewBlog);
router.patch('/:id', controller.updateBlog);
router.patch('/updateAllAuthor/:uid', controller.updateAllAuthor);
router.delete('/:id', controller.deleteBlogById);

module.exports = router;
