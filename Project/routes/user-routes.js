const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/user-sign-up', (req, res, next) => {
  res.render('sign-up');
});

module.exports = router;
