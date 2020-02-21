'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

var usersData = {};
var eventData = {};

var invitedPeople = [];

var allPeople = {};

function initializePage(){
    $('#addGuestsModal').on('show.bs.modal', function(){
        openSelectPeopleModalHandler(invitedPeople);
    });

    // Extract data
    eventData = $('#eventData').data('event');
    usersData = $('#eventData').data('users');
    allPeople = $('#eventData').data('allpeople');

    initSelectPeopleModal(allPeople, onGuestsChange);

    invitedPeople = eventData.guests.map(guest => usersData[guest]);
    updateAvatarList();
}

var closeButton = '<i class="material-icons rem-person-btn">cancel</i>'

function makeAvatar(name){
    return "<div class=\"avatar\">" + name[0].toUpperCase() + "</div>";
}

function onGuestsChange(newInviteList){
    invitedPeople = Array.from(newInviteList);
    updateAvatarList();
}

function updateAvatarList(){
    if(invitedPeople.length > 0){
        var avatarsHTML = ''
        for(var i=0; i < invitedPeople.length; i++){
            var person = invitedPeople[i];
            avatarsHTML += makeAvatar(person.name);
        }
        $('#peopleContainer').html(avatarsHTML);
    } else{
        $('#peopleContainer').text('Guests will appear here when you add them');
    }
}