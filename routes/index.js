const express = require('express');
const router = express.Router();
const project = require('../data.json').projects;
// console.log(project);

// render index.pug with data
router.get('/', (req, res) => {
  const indexTemplateData = { project }
  res.render('index', indexTemplateData);
});

module.exports = router;
