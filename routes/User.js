const express = require('express');
const UserController = require('../controllers/User');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();
const userController = new UserController();

router.get('/', authenticateJWT, userController.getAll);
router.post('/signup', userController.create);
router.post('/signin', userController.login);

module.exports = router;
