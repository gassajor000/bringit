var dbManager = require('../db-manager');
var db = new dbManager();
const Handlebars = require('handlebars');

exports.view = function(req, res){
  var event = db.getEvent('0')
  var eventData = {'event': event, 'users': db.getUsersForEvent(event.id)};
  res.render('edit', eventData);
};
