const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});
router.get('/log', require('./log'));

module.exports = router;
