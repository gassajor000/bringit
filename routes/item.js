var dbManager = require('../db-manager');
var db = new dbManager();

exports.add = function(req, res){
    /* data={name: 'item name', description: 'item description', quantity: qty, points: pts, category: 'parent category', eventId: event.id} */
  db.addItem(req.body.name, req.body.description, req.body.quantity, req.body.points, req.body.category, req.body.eventId);
  res.send(200);
};

exports.claim = function(req, res){
    /* data={itemId: item.id, quantity: qty} */
    var username = req.cookies.username;

    if (!username){
      res.send(401);  // Not logged in!
      return
    }

    db.claimItem(req.body.itemId, username, req.body.quantity)
    res.send(200);
};