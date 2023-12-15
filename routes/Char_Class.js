const express = require('express');
const Char_ClassController = require('../controllers/Char_Class');

const router = express.Router();
const char_ClassController = new Char_ClassController();

router.get('/', char_ClassController.getAll);

module.exports = router;
