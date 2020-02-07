
/*
 * GET event list page.
 */
event = require('../mock-event.json');
const Handlebars = require('handlebars');

exports.view = function(req, res){
  res.render('event', event);
};

Handlebars.registerHelper("getFirstLetter", function(s) {
  return s[0].toUpperCase();
});