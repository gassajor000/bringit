var dbManager = require('../db-manager');
var db = new dbManager();

exports.view = function(req, res){
  var event = db.getEvent(req.query.id)
  var eventData = {'event': event, 'users': db.getUsersForEvent(event.id), 'allPeople': db.getUserFriends(req.cookies.username)};
  res.render('edit', eventData);
};

exports.update = function(req, res){
  db.updateEvent(req.body.title, req.body.date, req.body.type, req.body.guests, req.body.eventId);
}
