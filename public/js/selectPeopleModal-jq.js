'use strict';

var g_allPeople = [];
var g_guestsChangedCallback = null;

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

function removePerson(){
    var name = $(this).closest('li').children('p').text();
    tmpInvitedPeople.splice(tmpInvitedPeople.indexOf(name), 1);
    updateInvitedGuests();
}


/* Initializes the modal
 * allPeople: array of names of all friends
 * guestsChangedCallback: callback function for when the modal closes and the guest list was changed. 
 *                          Accepts an updated array of invited people. 
*/
function initSelectPeopleModal(allPeople, guestsChangedCallback){
    g_allPeople = allPeople;
    g_guestsChangedCallback = guestsChangedCallback;

    $('#inputNameSearch').on('input', updateSearchResults);
    $('#inputNameSearch').on('change', function(){
        $('#inputNameSearch')[0].value = '';
    });

    $('#invite-submit-btn').click(function(){
        g_guestsChangedCallback(tmpInvitedPeople);
        $('#addGuestsModal').modal('hide');
    });
}
/* Opens the modal
 * invitedPeople: array of names of people currently invited
*/
function openSelectPeopleModalHandler(invitedPeople){
    tmpInvitedPeople = Array.from(invitedPeople);
    updateInvitedGuests();
}
