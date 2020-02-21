var dbManager = require('../db-manager');
var db = new dbManager();

var cookieAge = 1000*60*60*24;  // 24 hours

exports.view = function(req, res){
  res.render('login');
};

exports.login = function(req, res){
  user = db.getUser(req.body.username);
  if (user && user.password === req.body.password){
    res.cookie('username', user.username, {maxAge:cookieAge});
    res.send(200);
  } else {
    console.log('Failed login: ' + req.body.username);
    res.send(401);
  }
}