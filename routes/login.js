var dbManager = require('../db-manager');
var db = new dbManager();

exports.view = function(req, res){
  res.render('login');
};