'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage(){
    $('#inputNameSearch').on('input', updateSearchResults);
    $('#inputNameSearch').on('change', function(){
        $('#inputNameSearch')[0].value = '';
    });
    // $('#addGuestsModal').on('hide.bs.modal', updateAvatarList);
    $('#addGuestsModal').on('show.bs.modal', function(){
        tmpInvitedPeople = Array.from(g_invitedPeople);
        updateInvitedGuests();
    });
    $('#invite-submit-btn').click(function(){
        updateAvatarList();
        $('#addGuestsModal').modal('hide');
    });

}

var g_allPeople = [
    'Jason Lin', 
    'Jordan Gassaway',
    'Andrew Camp',
    'Bill Gonzalez',
    'Bill Smith'
];

var g_invitedPeople = [];
var tmpInvitedPeople = [];
var closeButton = '<i class="material-icons rem-person-btn">cancel</i>'

function updateSearchResults(){
    var subs = $('#inputNameSearch')[0].value.toLowerCase();
    var results = []

    for(var i=0; i < g_allPeople.length; i++){
        var person = g_allPeople[i];
        if (person.toLowerCase().search(subs) != -1){
            results.push(person);
        }
    }

    if (results.length > 0){
        var resultsHTML = ''
        for(var i=0; i < results.length; i++){
            var person = results[i];
            resultsHTML += '<li class="dropdown-item search-result"><a href="#">' +  person + '</a></li>';
        }
        $('#search-results').html(resultsHTML);
        $('.search-result').click(resultClicked);
    } else {
        $('#search-results').text('No results');
    }
   
}

function updateInvitedGuests(){
    var guestsHTML = ''
    for(var i=0; i < tmpInvitedPeople.length; i++){
        var person = tmpInvitedPeople[i];
        guestsHTML += '<li class="list-group-item invited-guest">' + closeButton + makeAvatar(person) + '<p>' + person + '</p>' + '</li>';
    }
    $('#invited-guests-list').html(guestsHTML);
    $('.rem-person-btn').click(removePerson);
}

function resultClicked(e){
	e.preventDefault();
    var person = $(this).text();
    tmpInvitedPeople.push(person);
    $('#inputNameSearch')[0].value = '';
    updateInvitedGuests();
}

function makeAvatar(name){
    return "<div class=\"avatar\">" + name[0].toUpperCase() + "</div>";
}

function removePerson(){
    var name = $(this).closest('li').children('p').text();
    tmpInvitedPeople.splice(tmpInvitedPeople.indexOf(name), 1);
    updateInvitedGuests();
}

function updateAvatarList(){
    g_invitedPeople = Array.from(tmpInvitedPeople);
    if(g_invitedPeople.length > 0){
        var avatarsHTML = ''
        for(var i=0; i < g_invitedPeople.length; i++){
            var person = g_invitedPeople[i];
            avatarsHTML += makeAvatar(person);
        }
        $('#peopleContainer').html(avatarsHTML);
    } else{
        $('#peopleContainer').text('Guests will appear here when you add them');
    }
}