const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('home');
});

module.exports = router;
