const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();

router.use('/item', authenticateJWT, require('./Item'));
router.use('/location', authenticateJWT, require('./Location'));
router.use('/buff', authenticateJWT, require('./Buff'));
router.use('/char_class', authenticateJWT, require('./Char_Class'));
router.use('/session', authenticateJWT, require('./Session'));
router.use('/user', require('./User'));

module.exports = router;
