var dbManager = require('../db-manager');
var db = new dbManager();

exports.view = function(req, res){
  res.render('create', {'allPeople': db.getUserFriends(req.cookies.username)});
};

exports.add = function(req, res){

  db.addEvent(req.body.title, req.body.date, req.body.type, req.cookies.username, req.body.guests, req.body.categories);
  res.send(200);

}
