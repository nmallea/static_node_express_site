const express = require('express');
const router = express.Router();
const project = require('../data.json').projects;

// render about.pug with data
router.get('/', (req, res) => {
  res.render('about');
});

module.exports = router;
