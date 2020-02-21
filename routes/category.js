var dbManager = require('../db-manager');
var db = new dbManager();

exports.add = function(req, res){
  db.addCategory(req.body.category, req.body.eventId);
  res.send(200);
};