var data = require('../points_data.json');

exports.view = function(req, res){
  res.render('points', data);
};

function addPoints(){

    return "73";
}
