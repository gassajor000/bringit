var dbManager = require('../db-manager');
var db = new dbManager();

exports.view = function(req, res){
  res.render('create', {'allPeople': db.getUserFriends(req.cookies.username)});
};

exports.add = function(req, res){
  var guests = req.body.guests ? req.body.guests : [];
  db.addEvent(req.body.title, req.body.date, req.body.type, req.cookies.username, guests, req.body.categories);
  res.send(200);

}
