
/*
 * GET home page.
 */
var dbManager = require('../db-manager');
var db = new dbManager();
const Handlebars = require('handlebars');

exports.view = function(req, res){
  data = {'events': db.getEventsForUser('happycamper33')};
  res.render('index', data);
};

Handlebars.registerHelper("getUserFullName", function(username) {
  return db.getUser(username).name;
});

Handlebars.registerHelper("formatDate", function(date) {
  return new Date(date + "GMT-08").toLocaleDateString("en-US");
});