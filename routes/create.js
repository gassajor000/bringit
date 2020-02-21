var dbManager = require('../db-manager');
var db = new dbManager();

exports.view = function(req, res){
  res.render('create', {'allPeople': db.getUserFriends(req.cookies.username)});
};
