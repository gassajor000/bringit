
/*
 * GET home page.
 */
var dbManager = require('../db-manager');
var db = new dbManager();
const Handlebars = require('handlebars');

exports.view = function(req, res){
  var username = req.cookies.username;

  if(!username){
    res.send(401);  // Not logged in!
    return;
  }

  data = {'events': db.getEventsForUser(username)};
  res.render('index', data);
};

Handlebars.registerHelper("getUserFullName", function(username) {
  return db.getUser(username).name;
});

Handlebars.registerHelper("formatDate", function(date) {
  return new Date(date + "GMT-08").toLocaleDateString("en-US");
});