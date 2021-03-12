const express = require('express');
const controller = require('./../controllers/blogController');

const router = express.Router();

router.get('/', controller.getAllBlogs);
router.get('/:id', controller.getBlogById);
router.post('/', controller.addNewBlog);
router.patch('/:id', controller.updateBlog);
router.patch('/updateAllAuthor/:uid', controller.updateAllAuthor);
router.delete('/:id', controller.deleteBlogById);

module.exports = router;
