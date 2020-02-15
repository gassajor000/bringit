
/*
 * GET home page.
 */
dbManager = require('../db-manager');
db = new dbManager();
const Handlebars = require('handlebars');

exports.view = function(req, res){
  data = {'events': db.getEventsForUser('happycamper33')};
  res.render('index', data);
};

Handlebars.registerHelper("getUserFullName", function(username) {
  return db.getUser(username).name;
});