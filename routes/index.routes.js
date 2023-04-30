const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/my-account', isLoggedIn, (req,res,next) => {
  res.render('my-account');
})

module.exports = router;
