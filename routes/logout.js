var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //req.sesson.user=null;
  res.redirect('/');
});


module.exports = router;
