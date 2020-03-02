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
    
    var required = $('#pointsData').data('required');
    var total = $('#pointsData').data('total');
    var diff = required - total;
    var percentage = (total / required) * 100;
    
    pointsArray.push(['Unclaimed', diff]);
    var data = google.visualization.arrayToDataTable(pointsArray);
    var unclaimedSliceNum = pointsArray.length - 2;
    var slices = {};
    slices[unclaimedSliceNum] = {color: 'gray'};

    var options = {
        title: percentage.toFixed(0) + "% of goal reached",
        pieHole: 0.7,
        // legend: {position:'top', maxLines:3},
        // legend: 'none',
        pieSliceText: 'value',
        slices: slices,
        // pieSliceTextStyle: {color: 'black'},
    };

    var chart = new google.visualization.PieChart($('#donutchart')[0]);
    chart.draw(data, options);
}