var dbManager = require('../db-manager');
var db = new dbManager();

exports.view = function(req, res){
  var event = db.getEvent('0');
  var users = db.getUsersForEvent(event.id);
  var items = db.getItemsForEvent(event.id);
  var points = addPoints(items);
  
  pointsData = {'points':[], 'total': totalPoints(points)};
  for(user in points){
    pointsData.points.push({'name': users[user].name, 'points': points[user]});
  }

  res.render('points', pointsData);
};

function addPoints(items){
  /*Return a dictionary mapping each user to their total points*/
  var points = {};
  
  Object.values(items).forEach(item =>{
    for(var assignee in item.claimedBy){
      if (assignee in points){
        points[assignee] += item.points * item.claimedBy[assignee];   // points * quantity claimed
      } else {
        points[assignee] = item.points * item.claimedBy[assignee];   // points * quantity claimed
      }
    }
  });
  return points;
}

function totalPoints(points){
  return Object.values(points).reduce((tot, val) => tot + val);
}