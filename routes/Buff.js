const express = require('express');
const BuffController = require('../controllers/Buff');

const router = express.Router();
const buffController = new BuffController();

router.get('/', buffController.getAll);

module.exports = router;
