var dbManager = require('../db-manager');
var db = new dbManager();

exports.view = function(req, res){
  var event = db.getEvent(req.query.id);
  var users = db.getUsersForEvent(event.id);
  var items = db.getItemsForEvent(event.id);
  var points = addPoints(event, items);
  
  pointsData = {'points':[], 'total': totalPoints(points), 'event':event, 'required': totalRequired(items)};
  pointsArr = [];
  for(user in points){
    pointsArr.push({'name': users[user].name, 'points': points[user]});
  }
  pointsData.points = pointsArr.sort((a, b) => b.points - a.points);

  res.render('points', pointsData);
};

function addPoints(event, items){
  /*Return a dictionary mapping each user to their total points*/
  var points = {};

  event.guests.forEach(user => {points[user] = 0});
  points[event.owner] = 0;
  
  Object.values(items).forEach(item =>{
    for(var assignee in item.claimedBy){
      points[assignee] += item.points * item.claimedBy[assignee];   // points * quantity claimed
    }
  });
  return points;
}

function totalPoints(points){
  return Object.values(points).reduce((tot, val) => tot + val, 0);
}

function totalRequired(items){
  return Object.values(items).reduce((tot, item) => tot + (item.quantity * item.points), 0);
}