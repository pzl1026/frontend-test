var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(
  '/app',
  function (req, res, next) {
    next('route');
    // var responseText = 'Hello World!<br>';
    // responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    // res.render('index', { title: 'Express', responseText });
    // if (req.params.id === '0') next('route');
    // // otherwise pass control to the next middleware function in this stack
    // else next();
  },
  function (req, res, next) {
    // render a regular page
    res.render('index');
  }
);

router.get('/app', function (req, res, next) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.render('index', { title: 'Express', responseText });
});

module.exports = router;
