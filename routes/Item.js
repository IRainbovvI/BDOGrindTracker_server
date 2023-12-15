const express = require('express');
const ItemController = require('../controllers/Item');

const router = express.Router();
const itemController = new ItemController();

router.get('/', itemController.getAll);

module.exports = router;
