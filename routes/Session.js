const express = require('express');
const SessionController = require('../controllers/Session');

const router = express.Router();
const sessionController = new SessionController();

router.get('/', sessionController.getAll);
router.get('/user', sessionController.getForUser);
router.post('/create', sessionController.create);

module.exports = router;
