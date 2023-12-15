const express = require('express');
const router = express.Router();

router.use('/item', require('./Item'));
router.use('/location', require('./Location'));
router.use('/buff', require('./Buff'));
router.use('/char_class', require('./Char_Class'));
router.use('/user', require('./User'));

module.exports = router;
