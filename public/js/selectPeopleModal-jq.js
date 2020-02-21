'use strict';

var g_allPeople = {};
var g_guestsChangedCallback = null;

var tmpInvitedPeople = [];
var closeButton = '<i class="material-icons rem-person-btn">cancel</i>'

function updateSearchResults(){
    var subs = $('#inputNameSearch')[0].value.toLowerCase();
    var results = []

    results = Object.values(g_allPeople).filter(user => user.name.toLowerCase().search(subs) != -1);

    if (results.length > 0){
        var resultsHTML = ''
        for(var i=0; i < results.length; i++){
            var user = results[i];
            resultsHTML += '<li class="dropdown-item search-result" data-user=\''+ JSON.stringify(user) + '\'><a href="#">' +  user.name + '</a></li>';
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
        guestsHTML += '<li class="list-group-item invited-guest" data-user=\''+ JSON.stringify(person) + '\'>' + closeButton + makeAvatar(person.name) + '<p>' + person.name + '</p>' + '</li>';
    }
    $('#invited-guests-list').html(guestsHTML);
    $('.rem-person-btn').click(removePerson);
}

function resultClicked(e){
	e.preventDefault();
    var user = $(this).data('user');
    tmpInvitedPeople.push(user);
    $('#inputNameSearch')[0].value = '';
    updateInvitedGuests();
}

function removePerson(){
    var user = $(this).closest('li').data('user');
    tmpInvitedPeople.splice(tmpInvitedPeople.map(u => u.name).indexOf(user.name), 1);
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
        if(g_guestsChangedCallback !== null){
            g_guestsChangedCallback(tmpInvitedPeople);
        }
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
