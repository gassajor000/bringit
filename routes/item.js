var dbManager = require('../db-manager');
var db = new dbManager();

exports.add = function(req, res){
  db.addItem(req.body.name, req.body.description, req.body.quantity, req.body.points, req.body.category, req.body.eventId);
  res.send(200);
};