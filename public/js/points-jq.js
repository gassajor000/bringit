'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage(){
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
}

function getFirstName(name){
    var names = name.split(' ');
    return names == "" ? names : names[0];
}


function drawChart() {
    var pointsData = $('#pointsData').data('points');
    var pointsArray = pointsData.map(entry => [getFirstName(entry.name), entry.points]);
    pointsArray.unshift(['Guest', 'Points']);
    var diff = $('#pointsData').data('required') - $('#pointsData').data('total');
    pointsArray.push(['Unclaimed', diff]);
    var data = google.visualization.arrayToDataTable(pointsArray);

    var options = {
        pieHole: 0.5,
        // legend: {position:'top', maxLines:3},
        legend: 'none',
        pieSliceText: 'label',
        // pieSliceTextStyle: {color: 'black'},
    };

    var chart = new google.visualization.PieChart($('#donutchart')[0]);
    chart.draw(data, options);
}