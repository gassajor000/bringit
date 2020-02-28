
/*
 * GET event list page.
 */
var dbManager = require('../db-manager');
var db = new dbManager();
const Handlebars = require('handlebars');

exports.view = function(req, res){
  var event = db.getEvent(req.query.id)
  var eventData = {'event': event, 'users': db.getUsersForEvent(event.id), 'items': db.getItemsForEvent(event.id), 'altView': false};
  res.render('event', eventData);

};

exports.eventAlt = function(req, res) {
  var event = db.getEvent(req.query.id)
  var eventData = {'event': event, 'users': db.getUsersForEvent(event.id), 'items': db.getItemsForEvent(event.id), 'altView': true};
  res.render('eventAlternate', eventData);
}

Handlebars.registerHelper("getFirstLetter", function(s) {
  return s[0].toUpperCase();
});

Handlebars.registerHelper("getUserFirstLetter", function(username) {
  return db.getUser(username).name[0];
});

Handlebars.registerHelper("listItems", function(items, options) {
  const itemsAsHtml = items.map(item =>
    options.fn(db.getItem(item))
    );
  return itemsAsHtml.join("\n") 
});

Handlebars.registerHelper("jsonify", function(o) {
  return JSON.stringify(o);
});

Handlebars.registerHelper("emptyDict", function(d) {
  return Object.keys(d).length === 0;
});