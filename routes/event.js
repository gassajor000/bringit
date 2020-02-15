
/*
 * GET event list page.
 */
dbManager = require('../db-manager');
db = new dbManager();
event = db.getEvent('0');
const Handlebars = require('handlebars');

exports.view = function(req, res){
  res.render('event', event);
};

Handlebars.registerHelper("getFirstLetter", function(s) {
  return s[0].toUpperCase();
});

Handlebars.registerHelper("getUserFirstLetter", function(username) {
  return db.getUser(username).name[0];
});

Handlebars.registerHelper("getItemsForEvent", function(event) {
  return db.getItemsForEvent(event.id);
});

Handlebars.registerHelper("getUsersForEvent", function(event) {
  return db.getUsersForEvent(event.id);
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