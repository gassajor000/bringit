'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage(){
    $('#inputNameSearch').on('input', updateSearchResults);
    $('#inputNameSearch').on('change', function(){
        $('#inputNameSearch').dropdown('toggle');
    });
}

var allPeople = [
    'Jason Lin', 
    'Jordan Gassaway',
    'Andrew Camp',
    'Bill Gonzalez',
    'Bill Smith'
];

var invitedPeople = [];

function updateSearchResults(){
    var subs = $('#inputNameSearch')[0].value.toLowerCase();
    var results = []

    for(var i=0; i < allPeople.length; i++){
        var person = allPeople[i];
        if (person.toLowerCase().search(subs) != -1){
            results.push(person);
        }
    }

    var resultsHTML = ''
    for(var i=0; i < results.length; i++){
        var person = results[i];
        resultsHTML += '<li class="dropdown-item"><a href="#" class="search-result">' +  person + '</a></li>';
    }
    $('#search-results').html(resultsHTML);
    $('.search-result').click(resultClicked);
}

function updateInvitedGuests(){
    var guestsHTML = ''
    for(var i=0; i < invitedPeople.length; i++){
        var person = invitedPeople[i];
        guestsHTML += '<li class="list-group-item">' + person + '</li>';
    }
    $('#invited-guests-list').html(guestsHTML);
}

function resultClicked(e){
	e.preventDefault();
    var person = $(this).text();
    invitedPeople.push(person);
    updateInvitedGuests();
}