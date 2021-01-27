const express = require('express');
const router = express.Router();
const controller = require('./../controllers/userController');

router.get('/', controller.getAllUsers);
router.get('/:uid', controller.getUserByID);
router.post('/', controller.addNewUser);
router.patch('/:uid', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;