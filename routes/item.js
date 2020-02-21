var dbManager = require('../db-manager');
var db = new dbManager();

exports.add = function(req, res){
    /* data={name: 'item name', description: 'item description', quantity: qty, points: pts, category: 'parent category', eventId: event.id} */
  db.addItem(req.body.name, req.body.description, req.body.quantity, req.body.points, req.body.category, req.body.eventId);
  res.send(200);
};

exports.claim = function(req, res){
    /* data={itemId: item.id, quantity: qty, user: 'username'} */
    db.claimItem(req.body.itemId, req.body.user, req.body.quantity)
    res.send(200);
};