event = require('../mock-event.json');

exports.view = function(req, res){
  res.render('create', event);
};
