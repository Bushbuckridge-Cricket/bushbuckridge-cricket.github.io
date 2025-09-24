const express = require('express');
const players = require('./players');
const fixtures = require('./fixtures');
const matches = require('./matches');
const news = require('./news');

const router = express.Router();

router.use('/players', players);
router.use('/fixtures', fixtures);
router.use('/matches', matches);
router.use('/news', news);

module.exports = router;

