'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage(){
    drawChart();
}

function getFirstName(name){
    var names = name.split(' ');
    return names == "" ? names : names[0];
}

function drawChart(){
    var required = $('#pointsData').data('required');
    var total = $('#pointsData').data('total');
    var percentage = (total / required) * 100;
    $('#progressContainer .c100').addClass('p' + percentage.toFixed(0));
    $('#progressNum').text(percentage.toFixed(0) + '%');
}