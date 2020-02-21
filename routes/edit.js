var dbManager = require('../db-manager');
var db = new dbManager();

exports.view = function(req, res){
  var event = db.getEvent(req.query.id)
  var eventData = {'event': event, 'users': db.getUsersForEvent(event.id)};
  res.render('edit', eventData);
};
