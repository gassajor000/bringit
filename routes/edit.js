var dbManager = require('../db-manager');
var db = new dbManager();
const Handlebars = require('handlebars');

exports.view = function(req, res){
  var event = db.getEvent('0')
  var eventData = {'event': event, 'users': db.getUsersForEvent(event.id)};
  res.render('edit', eventData);
};

exports.update = function(req, res){
  db.updateEvent(req.body.title, req.body.date, req.body.type, req.body.eventId);
}
